import type { ChromeTypes } from '@/background/utils';
import { BackgroundUtils } from '@/background/modules/utils';
import { Extension_DB as DB } from '@/background/modules';
import { ChromeApi, ServerApi } from '@/background/utils';

export const initListeners = () => {
	// TODO: Добавить синхронизацию с серверной БД
	// TODO: Пока не будет происходить загрузка, не будет отправлено на сервер (что-то типа кэширования)
	// TODO: Переписать на chrome.tabs.onActivated.addListener (init-model)
	// TODO: Добавить удаление старых записей
	chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
		if (!tab.url || BackgroundUtils.isIgnoredUrl(tab.url)) {
			return;
		}

		if (tab.url && changeInfo.status === 'complete') {
			const urlDB = await DB.getAnalyzeByUrl(tab.url);

			if (urlDB) return;

			const data = await ServerApi.analyzeUrl(tab.url);
			DB.addUrl(data);

			console.log('Ответ от сервера:', data);
		}
	});

	ChromeApi.messageAddListener<ChromeTypes.IMessageUrl, ChromeTypes.IMessageAnalyze>(
		({ message: msg, sendResponse }) => {
			if (!msg.body || BackgroundUtils.isIgnoredUrl(msg.body.url)) {
				return true;
			}

			if (msg.type === 'ui-ready' && msg.body) {
				DB.getAnalyzeByUrl(msg.body.url).then((data) => {
					console.log('From DB', data);
					sendResponse({ type: 'get-url', body: data ?? null });
					return true;
				});
			} else {
				sendResponse({ type: 'get-url', body: null });
				return true;
			}
		},
	);
};

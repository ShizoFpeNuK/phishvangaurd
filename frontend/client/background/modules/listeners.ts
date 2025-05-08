import type { ChromeTypes } from '@/background/utils';
import { BackgroundUtils } from '@/background/modules/utils';
import { Extension_DB as DB } from '@/background/modules';
import { ChromeApi, ServerApi } from '@/background/utils';

export const initListeners = () => {
	// TODO: Добавить синхронизацию с серверной БД
	chrome.tabs.onActivated.addListener(async ({ tabId }) => {
		const tab = await chrome.tabs.get(tabId);
		const url = tab.url;

		if (!url || BackgroundUtils.isIgnoredUrl(url)) {
			return;
		}

		const urlDB = await DB.getAnalyzeByUrl(url);

		if (urlDB) return;

		const data = await ServerApi.analyzeUrl(url);
		DB.addUrl(data);

		console.log('Ответ от сервера:', data);
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

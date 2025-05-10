import { ServerApi } from '@/background/utils';
import { ChromeTypes } from '@/settings';
import { BackgroundUtils } from '@/background/modules/utils';
import { Extension_DB as DB } from '@/background/modules';

export const initListeners = () => {
	const portUrlMap = new Map<chrome.runtime.Port, string>();

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

		for (const [port, storedUrl] of portUrlMap.entries()) {
			if (storedUrl === url) {
				port.postMessage({ type: 'get-url', body: data });
			}
		}
	});

	chrome.runtime.onConnect.addListener((port) => {
		if (port.name !== ChromeTypes.PortNames.POPUP) return;

		port.onMessage.addListener(async (msg: ChromeTypes.IMessage<ChromeTypes.IMessageUrl>) => {
			if (!msg.body || BackgroundUtils.isIgnoredUrl(msg.body.url)) {
				port.postMessage({ type: 'get-url', body: null });
				return;
			}

			if (msg.type === 'ui-ready') {
				portUrlMap.set(port, msg.body.url);

				const data = await DB.getAnalyzeByUrl(msg.body.url);
				port.postMessage({ type: 'get-url', body: data ?? null });
			}
		});

		port.onDisconnect.addListener(() => {
			portUrlMap.delete(port);
		});
	});

	chrome.runtime.onMessage.addListener(
		(msg: ChromeTypes.IMessage<ChromeTypes.IMessageUrl>, sender) => {
			if (msg.type === 'content-ready') {
				const tabId = sender.tab?.id;
				const url = sender.tab?.url;
				if (!tabId || !url) return;

				chrome.tabs.sendMessage(tabId, {
					type: 'get-url' as ChromeTypes.TMessageType,
					body: { url },
				});
			}
		},
	);
};

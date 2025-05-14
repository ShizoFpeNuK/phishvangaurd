import { ServerApi } from '@/background/utils';
import { ChromeTypes } from '@/settings';
import { BackgroundUtils } from '@/background/modules/utils';
import { Extension_DB as DB } from '@/background/modules';
import { extractFeaturesUrl } from 'utils';
import { RandomForestClassifier } from 'ml-random-forest';

export const initListeners = async () => {
	const res = await fetch(chrome.runtime.getURL('model/model_rf.json'));
	const json = await res.json();
	const model = RandomForestClassifier.load(json);
	console.log('initModel');

	const portUrlMap = new Map<chrome.runtime.Port, string>();
	const contentTabs = new Map<number, boolean>();

	const analyzeTab = async (tabId: number) => {
		const tab = await chrome.tabs.get(tabId);
		const url = tab.url;
		if (!url || BackgroundUtils.isIgnoredUrl(url)) return;

		let existingDB = await DB.getAnalyzeByUrl(url);

		if (!existingDB?.local) {
			const features = extractFeaturesUrl(url);
			const probability = model.predictProbability([features], 1)[0];

			existingDB = {
				...existingDB,
				url,
				local: {
					checked_at: Date.now(),
					risk_score: probability,
					report: { url_risk: probability },
				},
			};

			DB.addAnalyze(existingDB);

			for (const [port, storedUrl] of portUrlMap) {
				if (storedUrl === url) {
					port.postMessage({ type: 'get-url', body: existingDB });
				}
			}
		}

		if (!existingDB?.server) {
			const data = await ServerApi.analyzeUrl(url);

			existingDB = {
				...existingDB,
				url,
				server: {
					risk_score: data.risk_score,
					report: data.report,
					checked_at: data.checked_at,
				},
			};

			DB.addAnalyze(existingDB);

			for (const [port, storedUrl] of portUrlMap) {
				if (storedUrl === url) {
					port.postMessage({ type: 'get-url', body: existingDB });
				}
			}
		}

		if (contentTabs.get(tabId)) {
			chrome.tabs.sendMessage(tabId, {
				type: 'get-url',
				body: existingDB,
			});
		}
	};

	chrome.tabs.onActivated.addListener(async ({ tabId }) => {
		analyzeTab(tabId);

		// Сброс состояния всех остальных вкладок
		for (const id of contentTabs.keys()) {
			if (id !== tabId) contentTabs.delete(id);
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
				const data = await DB.getAnalyzeByUrl(msg.body.url);

				if (!data) {
					portUrlMap.set(port, msg.body.url);
				} else {
					port.postMessage({ type: 'get-url', body: data ?? null });
				}
			}
		});

		port.onDisconnect.addListener(() => {
			portUrlMap.delete(port);
		});
	});

	chrome.runtime.onMessage.addListener(
		async (msg: ChromeTypes.IMessage<ChromeTypes.IMessageUrl>, sender) => {
			if (msg.type === 'content-ready') {
				const tabId = sender.tab?.id;
				const url = sender.tab?.url;
				if (!tabId || !url) return;

				contentTabs.set(tabId, true);

				DB.getAnalyzeByUrl(url || '').then((data) => {
					if (data) {
						chrome.tabs.sendMessage(tabId, {
							type: 'get-url',
							body: data,
						});
					}
				});

				// chrome.tabs.sendMessage(tabId, {
				// 	type: 'get-url' as ChromeTypes.TMessageType,
				// 	body: { url },
				// });
			}
		},
	);
};

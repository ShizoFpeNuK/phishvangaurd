import { getThreatLevel } from '@/popup/utils';
import { useEffect, useState } from 'react';
// import { GlobalTypes, ChromeTypes } from '@/popup/types';
import { GlobalTypes, ChromeTypes } from '@/settings';

export const usePhishingInfo = (): [string, GlobalTypes.ThreatLevel, GlobalTypes.ThreatLevel] => {
	const [url, setUrl] = useState<string>('');
	const [threatLevel, setThreatLevel] = useState(GlobalTypes.ThreatLevel.UNKNOWN);
	const [serverThreatLevel, setServerThreatLevel] = useState(GlobalTypes.ThreatLevel.UNKNOWN);

	useEffect(() => {
		const port = chrome.runtime.connect({ name: ChromeTypes.PortNames.POPUP });

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const url = tabs[0]?.url || '';
			setUrl(url);

			chrome.storage.local.get<GlobalTypes.IAnalyzeUrlResult>(
				GlobalTypes.ListStorage.PHISHING_RESULT,
				({ phishingResult: { probability } }) => {
					setThreatLevel(getThreatLevel(probability));
				},
			);

			port.postMessage({ type: 'ui-ready', body: { url } });
		});

		port.onMessage.addListener((msg: ChromeTypes.IMessage<ChromeTypes.IMessageAnalyze>) => {
			if (msg.body && msg.type === 'get-url') {
				setServerThreatLevel(getThreatLevel(msg.body.risk_score));
			}
		});

		return () => {
			port.disconnect();
		};
	}, []);

	return [url, threatLevel, serverThreatLevel];
};

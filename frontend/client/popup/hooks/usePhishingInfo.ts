import { getThreatLevel } from '@/utils';
import { useEffect, useState } from 'react';
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

			port.postMessage({ type: 'ui-ready', body: { url } });
		});

		port.onMessage.addListener((msg: ChromeTypes.IMessage<ChromeTypes.IMessageAnalyze>) => {
			if (msg.body && msg.type === 'get-url') {
				setThreatLevel(getThreatLevel(msg.body.local?.risk_score ?? -1));
				setServerThreatLevel(getThreatLevel(msg.body.server?.risk_score ?? -1));
			}
		});

		return () => {
			port.disconnect();
		};
	}, []);

	return [url, threatLevel, serverThreatLevel];
};

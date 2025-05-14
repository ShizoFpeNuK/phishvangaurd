import { getThreatLevel } from '@/utils';
import { useEffect, useState } from 'react';
import { ChromeTypes, GlobalTypes } from '@/settings';

export const usePhishingInfo = (): [string, GlobalTypes.ThreatLevel, GlobalTypes.ThreatLevel] => {
	const [url, setUrl] = useState<string>('');
	const [threatLevel, setThreatLevel] = useState(GlobalTypes.ThreatLevel.UNKNOWN);
	const [serverThreatLevel, setServerThreatLevel] = useState(GlobalTypes.ThreatLevel.UNKNOWN);

	useEffect(() => {
		chrome.runtime.sendMessage({ type: 'content-ready', body: null });

		const cb = (msg: ChromeTypes.IMessage<ChromeTypes.IMessageAnalyze>) => {
			if (msg.body && msg.type === 'get-url') {
				setUrl(msg.body.url);
				setThreatLevel(getThreatLevel(msg.body.local?.risk_score ?? -1));
				setServerThreatLevel(getThreatLevel(msg.body.server?.risk_score ?? -1));
			}
		};

		chrome.runtime.onMessage.addListener(cb);

		return () => {
			chrome.runtime.onMessage.removeListener(cb);
		};
	}, []);

	return [url, threatLevel, serverThreatLevel];
};

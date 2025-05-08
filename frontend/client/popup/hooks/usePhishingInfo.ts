import type { ChromeTypes } from '@/popup/utils';
import { GlobalTypes } from '@/settings/global-types';
import { getThreatLevel } from '@/popup/utils';
import { useEffect, useState } from 'react';

export const usePhishingInfo = (): [string, GlobalTypes.ThreatLevel, GlobalTypes.ThreatLevel] => {
	const [url, setUrl] = useState<string>('');
	const [threatLevel, setThreatLevel] = useState(GlobalTypes.ThreatLevel.UNKNOWN);
	const [serverThreatLevel, setServerThreatLevel] = useState(GlobalTypes.ThreatLevel.UNKNOWN);

	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const url = tabs[0]?.url || '';
			setUrl(url);

			chrome.storage.local.get<GlobalTypes.IAnalyzeUrlResult>(
				GlobalTypes.ListStorage.PHISHING_RESULT,
				({ phishingResult: { probability } }) => {
					setThreatLevel(getThreatLevel(probability));
				},
			);

			chrome.runtime.sendMessage<ChromeTypes.IMessage<ChromeTypes.IMessageUrl>>(
				{ type: 'ui-ready', body: { url } },
				(data) => {
					setServerThreatLevel(getThreatLevel(data.body.risk_score));
				},
			);
		});
	}, []);

	return [url, threatLevel, serverThreatLevel];
};

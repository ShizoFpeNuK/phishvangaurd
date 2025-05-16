import { useEffect, useState } from 'react';
import { ChromeTypes } from '@/settings';

export const usePhishingInfo = () => {
	const [phishInfo, setPhishInfo] = useState<ChromeTypes.IMessageAnalyze | null>(null);

	useEffect(() => {
		chrome.runtime.sendMessage({ type: 'content-ready', body: null });

		const cb = (msg: ChromeTypes.IMessage<ChromeTypes.IMessageAnalyze>) => {
			if (msg.body && msg.type === 'get-url') {
				setPhishInfo(msg.body);
			}
		};

		chrome.runtime.onMessage.addListener(cb);

		return () => {
			chrome.runtime.onMessage.removeListener(cb);
		};
	}, []);

	return phishInfo;
};

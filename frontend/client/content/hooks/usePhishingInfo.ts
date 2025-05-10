import { useEffect, useState } from 'react';
import { ChromeTypes } from '@/settings';

export const usePhishingInfo = (): [string] => {
	const [url, setUrl] = useState<string>('');

	useEffect(() => {
		chrome.runtime.sendMessage({ type: 'content-ready', body: null });

		const cb = (msg: ChromeTypes.IMessage<ChromeTypes.IMessageAnalyze>) => {
			if (msg.body && msg.type === 'get-url') {
				setUrl(msg.body.url);
				console.log('Анализируем:', msg.body.url);
			}
		};

		chrome.runtime.onMessage.addListener(cb);

		return () => {
			chrome.runtime.onMessage.removeListener(cb);
		};
	}, []);

	return [url];
};

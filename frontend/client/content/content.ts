import { ChromeTypes } from '@/settings';
import { mountContent } from './utils/mountContent';

mountContent();

chrome.runtime.sendMessage({ type: 'content-ready', body: null });

chrome.runtime.onMessage.addListener((msg: ChromeTypes.IMessage<ChromeTypes.IMessageAnalyze>) => {
	if (msg.body && msg.type === 'get-url') {
		console.log('Анализируем:', msg.body.url);
	}
});

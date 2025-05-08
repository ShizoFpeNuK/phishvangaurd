import { ChromeTypes } from './chrome.types';

export class ChromeApi {
	static messageAddListener = <T, K = T>(
		callback: (args: ChromeTypes.ChromeMessageListener<T, K>) => void,
	) => {
		const handler = (
			message: ChromeTypes.IMessage<T>,
			sender: chrome.runtime.MessageSender,
			sendResponse: (response?: ChromeTypes.IMessage<K>) => void,
		) => {
			callback({ message, sender, sendResponse });
			return true;
		};

		chrome.runtime.onMessage.addListener(handler);
	};
}

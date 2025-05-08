/* eslint-disable @typescript-eslint/no-namespace */
export namespace ChromeTypes {
	// !Пока что не используется 'check-url'
	export const MESSAGE_TYPE = [
		'add-url',
		'check-url',
		'result-url',
		'get-url',
		'ui-ready',
	] as const;

	export type MessageType = (typeof MESSAGE_TYPE)[number];

	export interface IMessage<T> {
		type: MessageType;
		body: T | null;
	}

	export interface ChromeMessageListener<T, K = T> {
		message: ChromeTypes.IMessage<T>;
		sender: chrome.runtime.MessageSender;
		sendResponse: (response?: ChromeTypes.IMessage<K>) => void;
	}

	export interface IMessageAnalyze {
		url: string;
		type: 'phishing' | 'safe' | 'unknown';
		risk_score: number;
		checked_at: number;
	}

	export interface IMessageUrl {
		url: string;
	}
}

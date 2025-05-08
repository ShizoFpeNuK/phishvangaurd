/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace ChromeTypes {
	// !Пока что не используется 'check-url'
	const MESSAGE_TYPE = ['add-url', 'check-url', 'result-url', 'get-url', 'ui-ready'] as const;
	export type TMessageType = (typeof MESSAGE_TYPE)[number];

	export interface IMessage<T> {
		type: TMessageType;
		body: T | null;
	}

	const ALARM_TYPE = ['clear-db'] as const;
	export type TAlarmType = (typeof ALARM_TYPE)[number];

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

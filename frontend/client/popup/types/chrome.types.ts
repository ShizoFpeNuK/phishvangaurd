/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace ChromeTypes {
	/*============== MESSAGE ==============*/
	// !Пока что не используется 'check-url'
	const MESSAGE_TYPE = ['add-url', 'check-url', 'result-url', 'get-url', 'ui-ready'] as const;
	export type TMessageType = (typeof MESSAGE_TYPE)[number];

	export interface IMessage<T> {
		type: TMessageType;
		body: T | null;
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

	/*============== PORT ==============*/
	export const enum PortNames {
		POPUP = 'popup',
	}
}

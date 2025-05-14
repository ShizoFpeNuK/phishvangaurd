/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

export namespace ChromeTypes {
	/*============== MESSAGE ==============*/
	const MESSAGE_TYPE = ['get-url', 'ui-ready', 'content-ready', 'check-url'] as const;
	export type TMessageType = (typeof MESSAGE_TYPE)[number];

	export interface IMessage<T> {
		type: TMessageType;
		body: T | null;
	}

	interface PhishingServerReport {
		url_risk: number;
		domain_risk: number;
		ssl_risk: number;
		visual_risk: number;
	}

	interface PhishingLocalReport {
		url_risk: number;
	}

	export interface IMessageAnalyze {
		url: string;
		server?: {
			risk_score: number;
			checked_at: number;
			report: PhishingServerReport;
		};
		local?: {
			risk_score: number;
			checked_at: number;
			report: PhishingLocalReport;
		};
	}

	export interface IMessageUrl {
		url: string;
	}

	/*============== ALARM ==============*/
	export const enum AlarmNames {
		CLEAR_DB = 'clear-db',
	}

	/*============== PORT ==============*/
	export const enum PortNames {
		POPUP = 'popup',
	}
}

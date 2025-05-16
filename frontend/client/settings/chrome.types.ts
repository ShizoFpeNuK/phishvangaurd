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

	interface ServerUrlRisk {
		is_length: boolean;
		has_ip: boolean;
		has_not_https: boolean;
		has_subdomains: boolean;
		has_suspicious_words: boolean;
		has_at_symbol: boolean;
		has_dash: boolean;
		has_suspicious_tld: boolean;
		is_imitation: boolean;
	}

	interface ServerDomainRisk {
		is_new: boolean;
		is_latest: boolean;
		is_hidden_info: boolean;
	}

	interface ServerSslRisk {
		is_self_signed: boolean;
		is_short_dated: boolean;
		is_domain_mismatch: boolean;
		is_expired: boolean;
		is_dv_type: boolean;
	}

	interface ServerVisualRisk {
		is_copy: boolean;
	}

	export type ServerRisks = ServerSslRisk | ServerDomainRisk | ServerUrlRisk | ServerVisualRisk;
	interface PhishingServerReport {
		url: {
			url_risk: number;
			features: ServerUrlRisk;
		};
		domain: {
			domain_risk: number;
			features: ServerDomainRisk;
		};
		ssl: {
			ssl_risk: number;
			features: ServerSslRisk;
		};
		visual: {
			visual_risk: number;
			features: ServerVisualRisk;
		};
	}

	interface PhishingLocalReport {
		url: {
			url_risk: number;
		};
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

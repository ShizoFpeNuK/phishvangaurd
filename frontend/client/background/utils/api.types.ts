/* eslint-disable @typescript-eslint/no-namespace */
export namespace ServerTypes {
	interface PhishingReport {
		url: {
			url_risk: number;
			features: {
				is_length: boolean;
				has_ip: boolean;
				has_not_https: boolean;
				has_subdomains: boolean;
				has_suspicious_words: boolean;
				has_at_symbol: boolean;
				has_dash: boolean;
				has_suspicious_tld: boolean;
				is_imitation: boolean;
			};
		};
		domain: {
			domain_risk: number;
			features: { is_new: boolean; is_latest: boolean; is_hidden_info: boolean };
		};
		ssl: {
			ssl_risk: number;
			features: {
				is_self_signed: boolean;
				is_short_dated: boolean;
				is_domain_mismatch: boolean;
				is_expired: boolean;
				is_dv_type: boolean;
			};
		};
		visual: {
			visual_risk: number;
			features: { is_copy: boolean };
		};
	}

	export interface IAnalyzeUrl {
		url: string;
		risk_score: number;
		checked_at: number;
		report: PhishingReport;
	}
}

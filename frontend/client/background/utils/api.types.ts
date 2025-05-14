/* eslint-disable @typescript-eslint/no-namespace */
export namespace ServerTypes {
	interface PhishingReport {
		url_risk: number;
		domain_risk: number;
		ssl_risk: number;
		visual_risk: number;
	}

	export interface IAnalyzeUrl {
		url: string;
		risk_score: number;
		checked_at: number;
		report: PhishingReport;
	}
}

/* eslint-disable @typescript-eslint/no-namespace */

export namespace GlobalTypes {
	/* ============ STORAGE ============ */
	export const enum ListStorage {
		PHISHING_RESULT = 'phishingResult',
	}

	/* ============ PHISHING ============ */
	export const enum ThreatLevel {
		UNKNOWN,
		LOW,
		MEDIUM,
		HIGH,
		CRITICAL,
	}

	export interface IAnalyzeUrlResult {
		[ListStorage.PHISHING_RESULT]: {
			url: string;
			prediction: number;
			probability: number;
		};
	}
}

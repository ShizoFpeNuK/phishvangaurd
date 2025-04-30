/* ============ STORAGE ============ */
export const enum LIST_STORAGE {
	PHISHING_RESULT = 'phishingResult',
}

/* ============ PHISHING ============ */
export const enum THREAT_LEVEL {
	LOW,
	MEDIUM,
	HIGH,
	CRITICAL,
}

export interface IAnalyzeUrlResult {
	[LIST_STORAGE.PHISHING_RESULT]: {
		url: string;
		prediction: number;
		probability: number;
	};
}

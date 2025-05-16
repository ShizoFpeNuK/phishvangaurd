/* eslint-disable @typescript-eslint/no-namespace */

export namespace GlobalTypes {
	/* ============ PHISHING ============ */
	export const enum ThreatLevel {
		UNKNOWN,
		LOW,
		MEDIUM,
		HIGH,
	}

	export const enum ThreatLevelBounds {
		UNKNOWN = 0,
		LOW = 0.5,
		MEDIUM = 0.8,
		HIGH = 1,
	}
}

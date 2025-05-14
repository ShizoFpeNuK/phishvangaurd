import { GlobalTypes } from '@/settings';

export const getThreatLevel = (riskScore: number): GlobalTypes.ThreatLevel => {
	if (riskScore === -1) {
		return GlobalTypes.ThreatLevel.UNKNOWN;
	}
	if (riskScore < 0.3) {
		return GlobalTypes.ThreatLevel.LOW;
	}
	if (riskScore < 0.6) {
		return GlobalTypes.ThreatLevel.MEDIUM;
	}
	if (riskScore < 0.85) {
		return GlobalTypes.ThreatLevel.HIGH;
	}

	return GlobalTypes.ThreatLevel.CRITICAL;
};

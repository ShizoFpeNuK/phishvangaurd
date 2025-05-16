import { GlobalTypes } from '@/settings';

export const getThreatLevel = (riskScore: number): GlobalTypes.ThreatLevel => {
	if (riskScore < GlobalTypes.ThreatLevelBounds.UNKNOWN) {
		return GlobalTypes.ThreatLevel.UNKNOWN;
	}
	if (riskScore < GlobalTypes.ThreatLevelBounds.LOW) {
		return GlobalTypes.ThreatLevel.LOW;
	}
	if (riskScore < GlobalTypes.ThreatLevelBounds.MEDIUM) {
		return GlobalTypes.ThreatLevel.MEDIUM;
	}

	return GlobalTypes.ThreatLevel.HIGH;
};

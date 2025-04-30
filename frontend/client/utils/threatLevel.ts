import { THREAT_LEVEL } from '@/settings/global-types';

export const getThreatLevel = (probability: number): THREAT_LEVEL => {
	if (probability < 0.3) {
		return THREAT_LEVEL.LOW;
	}
	if (probability < 0.6) {
		return THREAT_LEVEL.MEDIUM;
	}
	if (probability < 0.85) {
		return THREAT_LEVEL.HIGH;
	}
	return THREAT_LEVEL.CRITICAL;
};

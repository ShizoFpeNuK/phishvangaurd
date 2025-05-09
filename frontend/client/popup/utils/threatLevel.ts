// import { GlobalTypes } from '@/popup/types';
import { GlobalTypes } from '@/settings';

export const getThreatLevel = (probability: number): GlobalTypes.ThreatLevel => {
	if (probability < 0.3) {
		return GlobalTypes.ThreatLevel.LOW;
	}
	if (probability < 0.6) {
		return GlobalTypes.ThreatLevel.MEDIUM;
	}
	if (probability < 0.85) {
		return GlobalTypes.ThreatLevel.HIGH;
	}

	return GlobalTypes.ThreatLevel.CRITICAL;
};

import { GlobalTypes } from '@/settings';

export const THREAT_LEVEL_TEXT = {
	[GlobalTypes.ThreatLevel.UNKNOWN]: '🔄 Идёт анализ...',
	[GlobalTypes.ThreatLevel.LOW]: '✅ Это сайт, с которым всё в порядке!',
	[GlobalTypes.ThreatLevel.MEDIUM]: '⚠️ Возможный фишинг. Будьте осторожны!',
	[GlobalTypes.ThreatLevel.HIGH]: '🚨 Очень высокая вероятность фишинга!',
};

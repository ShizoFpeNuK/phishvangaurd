import { GlobalTypes } from '@/settings';

export const ThreatLevelText = {
	[GlobalTypes.ThreatLevel.UNKNOWN]: '🔄 Идёт анализ...',
	[GlobalTypes.ThreatLevel.LOW]: '✅ Это сайт, с которым всё в порядке!',
	[GlobalTypes.ThreatLevel.MEDIUM]: '⚠️ Возможный фишинг. Будьте осторожны!',
	[GlobalTypes.ThreatLevel.HIGH]: '⚠️ Высокий риск фишинга!',
	[GlobalTypes.ThreatLevel.CRITICAL]: '🚨 Очень высокая вероятность фишинга!',
};

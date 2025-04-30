import type { FC } from 'react';
import { IPhishingWarning } from './types';
import { THREAT_LEVEL } from '@/settings/global-types';

export const PhishingWarning: FC<IPhishingWarning> = ({ level }) => {
	return (
		<div>
			{level === THREAT_LEVEL.CRITICAL && (
				<div className="warning critical">
					🚨 Очень высокая вероятность фишинга! <br />
					<button onClick={() => alert('Дополнительная информация')}>Подробнее</button>
				</div>
			)}
			{level === THREAT_LEVEL.HIGH && (
				<div className="warning high">
					⚠️ Высокий риск фишинга! <br />
					<button onClick={() => alert('Дополнительная информация')}>Подробнее</button>
				</div>
			)}
			{level === THREAT_LEVEL.MEDIUM && (
				<div className="warning medium">
					⚠️ Возможный фишинг. Будьте осторожны! <br />
					<button onClick={() => alert('Дополнительная информация')}>Подробнее</button>
				</div>
			)}
			{level === THREAT_LEVEL.LOW && (
				<div className="warning low">✅ Это сайт, с которым всё в порядке!</div>
			)}
		</div>
	);
};

export default PhishingWarning;

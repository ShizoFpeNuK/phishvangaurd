import type { FC } from 'react';

export const PhishingModal: FC<{ level: string }> = ({ level }) => {
	return (
		<div className="phishing-modal">
			⚠️ Подозрение на фишинг: <strong>{level}</strong>
		</div>
	);
};

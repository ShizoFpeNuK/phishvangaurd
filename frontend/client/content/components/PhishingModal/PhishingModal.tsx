import { usePhishingInfo } from '@/content/hooks/usePhishingInfo';
import type { FC } from 'react';

export const PhishingModal: FC<{ level: string }> = ({ level }) => {
	const [url] = usePhishingInfo();

	return (
		<div className="modal">
			<p>
				<strong>URL:</strong> {url}
			</p>
			<p>
				⚠️ Подозрение на фишинг: <strong>{level}</strong>
			</p>
		</div>
	);
};

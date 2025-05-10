import type { FC } from 'react';
import { PhishingWarning } from '@/popup/components';
import { usePhishingInfo } from '@/popup/hooks/usePhishingInfo';

const Popup: FC = () => {
	const [url, threatLevel, serverThreatLevel] = usePhishingInfo();

	return (
		<div className="p-4 w-64">
			<h1 className="text-lg font-bold mb-2">PhishVanguard</h1>
			<p>
				<strong>URL:</strong> {url}
			</p>
			<div>
				<strong>Клиент:</strong>
				<PhishingWarning level={threatLevel} />
			</div>
			<div>
				<strong>Сервер:</strong>
				<PhishingWarning level={serverThreatLevel} />
			</div>
		</div>
	);
};

export default Popup;

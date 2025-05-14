import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { usePhishingInfo } from '@/content/hooks/usePhishingInfo';
import { PhishingWarning } from '@/popup/components';

export const PhishingModal: FC<{ level: string }> = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [url, threatLevel, serverThreatLevel] = usePhishingInfo();

	useEffect(() => {
		if (url) {
			setIsOpen(true);
		}
	}, [url]);

	return (
		<>
			{isOpen && (
				<div className="modal-overlay">
					<div className="modal">
						<div className="modal-header">
							<h2>Предупреждение</h2>
						</div>
						<div className="modal-content">
							<p className="url">
								<strong>URL:</strong> {url}
							</p>
							{/* TODO: Изменить */}
							<div>
								<strong>Локально:</strong>
								<PhishingWarning level={threatLevel} />
							</div>
							<div>
								<strong>Сервер:</strong>
								<PhishingWarning level={serverThreatLevel} />
							</div>
						</div>
						<div className="modal-footer">
							<button
								className="btn-close"
								onClick={() => setIsOpen(false)}
							>
								<span>Закрыть</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

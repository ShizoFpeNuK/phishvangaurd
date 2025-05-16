import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { usePhishingInfo } from '@/content/hooks/usePhishingInfo';
import { PhishingWarning } from '@/popup/components';
import { getThreatLevel } from '@/utils';
import { PhishDetails } from '../PhishDetails';

export const PhishingModal: FC<{ level: string }> = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const phishInfo = usePhishingInfo();

	useEffect(() => {
		if (phishInfo?.url) {
			setIsOpen(true);
		}
	}, [phishInfo]);

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
								<strong>URL:</strong> {phishInfo?.url}
							</p>
							<div>
								<strong>Клиент:</strong>
								<PhishingWarning level={getThreatLevel(phishInfo?.local?.risk_score ?? -1)} />
							</div>
							<div>
								<strong>Сервер:</strong>
								<PhishingWarning level={getThreatLevel(phishInfo?.server?.risk_score ?? -1)} />
								{phishInfo && (
									<div>
										<PhishDetails details={phishInfo} />
									</div>
								)}
							</div>
							<div></div>
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

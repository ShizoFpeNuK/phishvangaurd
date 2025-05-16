import { FC } from 'react';
import { IPhishDetails } from './types';
import { NOTIFICATIONS } from './constants';
import { ChromeTypes, GlobalTypes } from '@/settings';

export const PhishDetails: FC<IPhishDetails> = ({ details }) => {
	const { server } = details;

	return (
		<>
			{server && server.risk_score >= GlobalTypes.ThreatLevelBounds.LOW && (
				<ul>
					{Object.entries(server.report.url.features).map(([key, value]) => {
						if (value) {
							return <li>{NOTIFICATIONS[key as keyof ChromeTypes.ServerRisks]}</li>;
						}
					})}
					{Object.entries(server.report.domain.features).map(([key, value]) => {
						if (value) {
							return <li>{NOTIFICATIONS[key as keyof ChromeTypes.ServerRisks]}</li>;
						}
					})}
					{Object.entries(server.report.ssl.features).map(([key, value]) => {
						if (value) {
							return <li>{NOTIFICATIONS[key as keyof ChromeTypes.ServerRisks]}</li>;
						}
					})}
					{Object.entries(server.report.visual.features).map(([key, value]) => {
						if (value) {
							return <li>{NOTIFICATIONS[key as keyof ChromeTypes.ServerRisks]}</li>;
						}
					})}
				</ul>
			)}
		</>
	);
};

import type { FC } from 'react';
import { IPhishingWarning } from './types';
import { ThreatLevelText } from './constants';

export const PhishingWarning: FC<IPhishingWarning> = ({ level }) => {
	return <div>{ThreatLevelText[level]}</div>;
};

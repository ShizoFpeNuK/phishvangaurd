import type { FC } from 'react';
import { IPhishingWarning } from './types';
import { THREAT_LEVEL_TEXT } from './constants';

export const PhishingWarning: FC<IPhishingWarning> = ({ level }) => {
	return <div>{THREAT_LEVEL_TEXT[level]}</div>;
};

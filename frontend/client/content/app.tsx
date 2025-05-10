import { FC } from 'react';
import { PhishingModal } from './components/PhishingModal/PhishingModal';

export const App: FC = () => {
	return (
		<div>
			<PhishingModal level="HIGH" />
		</div>
	);
};

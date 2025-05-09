import Popup from '@/popup/popup';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Popup />
	</StrictMode>,
);

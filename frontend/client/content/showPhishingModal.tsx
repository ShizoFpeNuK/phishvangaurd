import ReactDOM from 'react-dom/client';
import { PhishingModal } from './modal';

export const showPhishingModal = () => {
	// export const showPhishingModal = (level: string) => {

	console.log(document.body);

	// if (document.getElementById('phishing-modal-root')) return;

	const rootElem = document.createElement('div');
	rootElem.id = 'phishing-modal-root';
	document.body.appendChild(rootElem);

	const root = ReactDOM.createRoot(rootElem);
	root.render(<PhishingModal level={'HIGH'} />);
};

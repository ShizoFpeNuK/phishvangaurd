import cssText from '../styles.css?inline';
import { App } from '../app';
import { createRoot } from 'react-dom/client';

export const mountContent = () => {
	const container = document.createElement('div');
	container.id = 'phishvanguard-root';
	container.style.position = 'relative';
	container.style.zIndex = '99999999';
	const shadow = container.attachShadow({ mode: 'open' });
	document.body.appendChild(container);

	const reactRoot = document.createElement('div');
	reactRoot.id = 'root';
	shadow.appendChild(reactRoot);

	const link = document.createElement('link');
	link.href =
		'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
	link.rel = 'stylesheet';
	shadow.appendChild(link);

	const styleEl = document.createElement('style');
	styleEl.textContent = cssText;
	shadow.appendChild(styleEl);

	createRoot(reactRoot).render(<App />);
};

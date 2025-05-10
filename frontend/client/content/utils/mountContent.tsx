import { createRoot } from 'react-dom/client';
import cssText from '../styles.css?inline';
import { App } from '../app';

export const mountContent = () => {
	const container = document.createElement('div');
	container.id = 'phishvanguard-root';
	const shadow = container.attachShadow({ mode: 'open' });
	document.body.appendChild(container);

	const reactRoot = document.createElement('div');
	reactRoot.id = 'root';
	shadow.appendChild(reactRoot);

	const styleEl = document.createElement('style');
	styleEl.textContent = cssText;
	shadow.appendChild(styleEl);

	createRoot(reactRoot).render(<App />);
};

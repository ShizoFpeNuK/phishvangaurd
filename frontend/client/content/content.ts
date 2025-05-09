import { showPhishingModal } from './showPhishingModal';

chrome.runtime.onMessage.addListener((msg) => {
	if (msg.type === 'phishing-detected') {
		// showPhishingModal(msg.level);
	}
});

showPhishingModal();
console.log(123);

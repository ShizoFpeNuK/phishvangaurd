import { initModel } from './init-model';

initModel();

// TODO: Пока не будет происходить загрузка, не будет связи (что-то типа кэширования)
// TODO: Надо игнорировать новый таб
chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.url) {
		const res = await fetch('http://127.0.0.1:8000/analyze', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: tab.url }),
		});
		const data = await res.json();
		console.log('Ответ от сервера:', data);
		// chrome.runtime.sendMessage({
		//   type: 'analysisResult',
		//   payload: data,
		// });
	}
});

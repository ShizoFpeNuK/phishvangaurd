import { useEffect, useState } from 'react';

function App() {
	const [url, setUrl] = useState<string>('');
	// const [status, setStatus] = useState<string>("Checking...");

	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]?.url) {
				const currentUrl = tabs[0].url;
				setUrl(currentUrl);
			}
		});
	}, []);

	return (
		<div className="p-4 w-64">
			<h1 className="text-lg font-bold mb-2">PhishVanguard</h1>
			<p>
				<strong>URL:</strong> {url}
			</p>
			<p className="mt-2">
				<strong>Status:</strong> {}
			</p>
		</div>
	);
}

export default App;

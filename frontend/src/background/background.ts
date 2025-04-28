chrome.tabs.onActivated.addListener(async (activeInfo) => {
	const tab = await chrome.tabs.get(activeInfo.tabId);
	if (tab.url) {
		console.log('Activated tab URL:', tab.url);
	}
});

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.url) {
		console.log('Updated 23123131 tab URL:', tab.url);
	}
});

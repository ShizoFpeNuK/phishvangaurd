import type { GlobalTypes } from '@/settings/global-types';
import { RandomForestClassifier } from 'ml-random-forest';
import { extractFeaturesUrl } from 'utils';
import { BackgroundUtils } from '@/background/modules/utils';

export const initModel = async () => {
	const res = await fetch(chrome.runtime.getURL('model/model_rf.json'));
	const json = await res.json();
	const model = RandomForestClassifier.load(json);

	console.log('initModel');

	// TODO: Добавить кэширование
	chrome.tabs.onActivated.addListener(async ({ tabId }) => {
		const tab = await chrome.tabs.get(tabId);
		const url = tab.url;

		if (!url || BackgroundUtils.isIgnoredUrl(url)) {
			return;
		}

		const features = extractFeaturesUrl(url);
		const prediction = model.predict([features])[0];
		const probability = model.predictProbability([features], 1)[0];

		chrome.storage.local.set<GlobalTypes.IAnalyzeUrlResult>({
			phishingResult: {
				url,
				prediction,
				probability,
			},
		});
	});
};

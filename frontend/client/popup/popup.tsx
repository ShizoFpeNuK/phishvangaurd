// import { extractFeaturesUrl } from 'utils';
// import { RandomForestClassifier } from 'ml-random-forest';
import { FC, useEffect, useState } from 'react';
import { getThreatLevel } from '@/utils';
import { IAnalyzeUrlResult, THREAT_LEVEL } from '@/settings/global-types';
import { PhishingWarning } from '@/components';
import { LIST_STORAGE } from '@/settings/global-types';

// TODO: Поместить под Context
// let model: RandomForestClassifier | null = null;

const Popup: FC = () => {
	const [url, setUrl] = useState<string>('');
	const [threatLevel, setThreatLevel] = useState(THREAT_LEVEL.LOW);
	useEffect(() => {
		chrome.storage.local.get<IAnalyzeUrlResult>(
			LIST_STORAGE.PHISHING_RESULT,
			({ phishingResult: { url, probability } }) => {
				setUrl(url);
				setThreatLevel(getThreatLevel(probability));
			},
		);
	}, []);

	return (
		<div className="p-4 w-64">
			<h1 className="text-lg font-bold mb-2">PhishVanguard</h1>
			<p>
				<strong>URL:</strong> {url}
			</p>
			<PhishingWarning level={threatLevel} />
		</div>
	);
};

export default Popup;

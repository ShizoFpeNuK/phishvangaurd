import fs from 'node:fs';
import Papa from 'papaparse';
import { RandomForestClassifier } from 'ml-random-forest';
import { extractFeaturesUrl } from 'utils';

const csvText = fs.readFileSync('server/datasets/phishing_url.csv', 'utf8');
const parsed = Papa.parse(csvText, { header: true });

const data: number[][] = [];
const labels: number[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
parsed.data.forEach((row: any) => {
	const url = row.url;
	const label = row.status;

	if (url && label) {
		data.push(extractFeaturesUrl(url));
		labels.push(label === 'phishing' ? 1 : 0);
	}
});

const rf = new RandomForestClassifier({
	seed: 10,
	nEstimators: 30,
	maxFeatures: 0.8,
	replacement: true,
	treeOptions: { maxDepth: 15 },
	useSampleBagging: false,
});

console.log('Начинаем обучение модели...');
rf.train(data, labels);
console.log('Закончили обучение модели...');

const modelJSON = rf.toJSON();
fs.writeFileSync('public/model/model_rf.json', JSON.stringify(modelJSON, null, 2));

console.log('Модель успешно обучена и сохранена!');

import { DataBase } from './types';
import { openDB } from 'idb';

const dbPromise = openDB<DataBase.PhishingDB>(DataBase.DataBaseNames.PHISHING, 1, {
	upgrade(db) {
		const store = db.createObjectStore(DataBase.DataBaseTables.URLS, { keyPath: 'url' });
		store.createIndex('type', 'type');
		store.createIndex('checkedAt', 'checked_at');
	},
});

const addAnalyze = async (data: DataBase.IUrlDB) => {
	const db = await dbPromise;
	await db.put(DataBase.DataBaseTables.URLS, data);
};

const getAnalyzeByUrl = async (url: string): Promise<DataBase.IUrlDB | undefined> => {
	const db = await dbPromise;
	return db.get(DataBase.DataBaseTables.URLS, url);
};

const deleteOldUrl = async (maxAgeMs: number) => {
	const db = await dbPromise;
	const tx = db.transaction(DataBase.DataBaseTables.URLS, 'readwrite');
	const store = tx.store;
	const index = store.index('checkedAt');

	const threshold = Date.now() - maxAgeMs;
	let cursor = await index.openCursor();

	console.log('Start clean!');

	while (cursor) {
		if (cursor.key < threshold) {
			await cursor.delete();
		}
		cursor = await cursor.continue();
	}

	await tx.done;
};

export const Extension_DB = { dbPromise, addUrl: addAnalyze, getAnalyzeByUrl, deleteOldUrl };

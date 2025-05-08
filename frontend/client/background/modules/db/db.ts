import { DataBase } from './types';
import { openDB } from 'idb';

const dbPromise = openDB<DataBase.PhishingDB>(DataBase.DataBaseNames.PHISHING, 1, {
	upgrade(db) {
		const store = db.createObjectStore(DataBase.DataBaseTables.URLS, { keyPath: 'url' });
		store.createIndex('type', 'type');
		store.createIndex('checkedAt', 'checkedAt');
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

export const Extension_DB = { dbPromise, addUrl: addAnalyze, getAnalyzeByUrl };

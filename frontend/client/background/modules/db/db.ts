import { DataBase } from './types';
import { openDB } from 'idb';

const dbPromise = openDB<DataBase.PhishingDB>(DataBase.DataBaseNames.PHISHING, 1, {
	upgrade(db) {
		const store = db.createObjectStore(DataBase.DataBaseTables.URLS, { keyPath: 'url' });
		store.createIndex('server-checked-at', 'server.checked_at');
		store.createIndex('local-checked-at', 'local.checked_at');
	},
});

const addAnalyze = async (data: DataBase.IUrlDB) => {
	const db = await dbPromise;
	console.log('AddAnalyze', data);
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
	const serverIndex = store.index('server-checked-at');
	const localIndex = store.index('local-checked-at');

	const threshold = Date.now() - maxAgeMs;
	console.log('Start clean!');

	let serverCursor = await serverIndex.openCursor();
	while (serverCursor) {
		if (serverCursor.key < threshold) {
			await store.delete(serverCursor.primaryKey as string);
		}
		serverCursor = await serverCursor.continue();
	}

	let localCursor = await localIndex.openCursor();
	while (localCursor) {
		if (localCursor.key < threshold) {
			await store.delete(localCursor.primaryKey as string);
		}
		localCursor = await localCursor.continue();
	}

	await tx.done;
};

export const Extension_DB = { dbPromise, addAnalyze, getAnalyzeByUrl, deleteOldUrl };

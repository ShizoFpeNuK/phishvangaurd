import { DBSchema } from 'idb';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace DataBase {
	export const enum DataBaseNames {
		PHISHING = 'phishing-db',
	}

	export const enum DataBaseTables {
		URLS = 'urls',
	}

	export interface PhishingDB extends DBSchema {
		urls: {
			key: string;
			value: DataBase.IUrlDB;
			indexes: { type: string; checkedAt: number };
		};
	}

	// TODO: Насколько верно сохранять url, а не домен? (Как минимум надо игнорировать параметры)
	// TODO: Придумать разделение оценки риска на url, domain и так далее
	export interface IUrlDB {
		url: string;
		type: 'phishing' | 'safe' | 'unknown';
		source: 'server' | 'local' | 'manual';
		risk_score: number;
		checked_at: number;
	}
}

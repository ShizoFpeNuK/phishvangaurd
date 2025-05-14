/* eslint-disable @typescript-eslint/no-namespace */
import { DBSchema } from 'idb';

export namespace DataBase {
	export const enum DataBaseNames {
		PHISHING = 'phishing-db',
	}

	export const enum DataBaseTables {
		URLS = 'urls',
	}

	export interface PhishingDB extends DBSchema {
		[DataBaseTables.URLS]: {
			key: string;
			value: DataBase.IUrlDB;
			indexes: { 'server-checked-at': number; 'local-checked-at': number };
		};
	}

	// TODO: Наверное, переписать
	export interface PhishingServerReport {
		url_risk: number;
		domain_risk: number;
		ssl_risk: number;
		visual_risk: number;
	}

	export interface PhishingLocalReport {
		url_risk: number;
	}

	// TODO: Насколько верно сохранять url, а не домен? (Как минимум надо игнорировать параметры)
	export interface IUrlDB {
		url: string;
		server?: {
			risk_score: number;
			checked_at: number;
			report: PhishingServerReport;
		};
		local?: {
			risk_score: number;
			checked_at: number;
			report: PhishingLocalReport;
		};
	}
}

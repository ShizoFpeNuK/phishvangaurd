import { ChromeApi } from '../utils';
import { Extension_DB as DB } from './db/db';
import { PERIOD_CLEAR, PERIOD_INVALIDITY } from './utils/constants';

export const clearIntervalDB = () => {
	chrome.runtime.onInstalled.addListener(() => {
		ChromeApi.createAlarm('clear-db', { periodInMinutes: PERIOD_CLEAR });
	});

	ChromeApi.alarmAddListener((alarm) => {
		if (alarm.name === 'clear-db') {
			DB.deleteOldUrl(PERIOD_INVALIDITY);
		}
	});
};

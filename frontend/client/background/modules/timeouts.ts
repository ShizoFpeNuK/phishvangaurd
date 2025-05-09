import { ChromeTypes } from '@/background/types';
import { Extension_DB as DB } from './db/db';
import { PERIOD_CLEAR, PERIOD_INVALIDITY } from './utils/constants';

export const clearIntervalDB = () => {
	chrome.runtime.onInstalled.addListener(() => {
		chrome.alarms.create(ChromeTypes.AlarmNames.CLEAR_DB, { periodInMinutes: PERIOD_CLEAR });
	});

	chrome.alarms.onAlarm.addListener((alarm) => {
		if (alarm.name === ChromeTypes.AlarmNames.CLEAR_DB) {
			DB.deleteOldUrl(PERIOD_INVALIDITY);
		}
	});
};

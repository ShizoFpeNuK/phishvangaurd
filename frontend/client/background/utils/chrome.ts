import { ChromeTypes } from './chrome.types';

interface TAlarm {
	name: ChromeTypes.TAlarmType;
	periodInMinutes?: number | undefined;
	scheduledTime: number;
}

export class ChromeApi {
	static messageAddListener = <T, K = T>(
		callback: (args: ChromeTypes.ChromeMessageListener<T, K>) => void,
	) => {
		// TODO: Убрать?
		const handler = (
			message: ChromeTypes.IMessage<T>,
			sender: chrome.runtime.MessageSender,
			sendResponse: (response?: ChromeTypes.IMessage<K>) => void,
		) => {
			callback({ message, sender, sendResponse });
			return true;
		};

		chrome.runtime.onMessage.addListener(handler);
	};

	static createAlarm = (name: ChromeTypes.TAlarmType, alarmInfo: chrome.alarms.AlarmCreateInfo) => {
		return chrome.alarms.create(name, alarmInfo);
	};

	static alarmAddListener = (callback: (alarm: TAlarm) => void) => {
		const handler = (alarm: chrome.alarms.Alarm) => {
			callback({ ...alarm, name: alarm.name as ChromeTypes.TAlarmType });
		};

		chrome.alarms.onAlarm.addListener(handler);
	};
}

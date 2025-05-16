import { parse } from 'tldts';

/**
 * Возвращает массив признаков URL.
 *
 * @param {string} url Полученный URL.
 * @return {Array[number]} Массив, состоящий из:
 * 1. Длина URL
 * 2. Наличие IP-адрес
 * 3. Наличие HTTPS
 * 4. Кол-во поддоменов
 * 5. Подозрительные слова
 * 6. Использование знаков @, -
 */

export const extractFeaturesUrl = (url: string): number[] => {
	const parsed = parse(url);
	const subdomain = parsed.subdomain || '';
	const protocol = url.startsWith('https') ? 1 : 0;

	// const newUrl = new URL(url);
	// const baseUrl = newUrl.origin + newUrl.pathname;

	return [
		url.length,
		// baseUrl.length,
		/https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url) ? 1 : 0,
		protocol,
		subdomain.split('.').length,
		/(login|verify|account|update|secure)/i.test(url) ? 1 : 0,
		/[@-]/.test(url) ? 1 : 0,
	];
};

import { parse } from 'tldts';

/**
 * Возвращает массив признаков URL.
 *
 * @param {string} url Полученный URL.
 * @return {Array[number]} Массив, состоящий из:
 * 1. Длина URL
 * 2. Кол-во слешей
 * 3. Кол-во точек
 * 4. Наличие цифр
 * 5. Наличие IP-адрес
 * 6. Наличие HTTPS
 * 7. Длина домена
 * 8. Кол-во поддоменов
 * 9. Подозрительные слова
 * 10. Использование знаков @, =, -
 */

export const extractFeaturesUrl = (url: string): number[] => {
	const parsed = parse(url);
	const hostname = parsed.domain || '';
	const subdomain = parsed.subdomain || '';
	//TODO: Возможно, в parsed имеется проверка http. Просмотреть документацию
	const protocol = url.startsWith('https') ? 1 : 0;

	return [
		url.length,
		(url.match(/\//g) || []).length,
		(url.match(/\./g) || []).length,
		/[0-9]/.test(url) ? 1 : 0,
		/https?:\/\/\d{1,3}/.test(url) ? 1 : 0,
		protocol,
		hostname.length,
		subdomain.split('.').length,
		/(login|verify|account|update|secure)/i.test(url) ? 1 : 0,
		/[@=-]/.test(url) ? 1 : 0,
	];
};

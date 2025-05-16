import { ChromeTypes } from '@/settings';

type Notification = Record<keyof ChromeTypes.ServerRisks, string>;

export const NOTIFICATIONS: Notification = {
	is_imitation: 'Признак: Имитация легитимного домена.',
	has_at_symbol: 'Признак: Содержится символ "@".',
	is_length: 'Признак: Длина URL.',
	has_ip: 'Признак: В качестве домена выступает IP-адрес.',
	has_subdomains: 'Признак: Наличие поддоменов.',
	has_suspicious_words: 'Признак: Подозрительные фишинговые слова.',
	has_dash: 'Признак: Имеется дефис в домене.',
	has_not_https: 'Признак: Отсутствует HTTPS.',
	has_suspicious_tld: 'Признак: Подозрительный TLD.',
	is_new: 'Признак: Возраст домена меньше месяца.',
	is_latest: 'Признак: Возраст домена меньше 3-х месяцев.',
	is_hidden_info: 'Признак: Имеется скрытая информация.',
	is_self_signed: 'Признак: Самоподписанный сертификат.',
	is_domain_mismatch: 'Признак: Несовпадение домена и сертификата.',
	is_expired: 'Признак: Сертификат истёк.',
	is_short_dated: 'Признак: Краткосрочный сертификат.',
	is_dv_type: 'Признак: DV (Domain Validation) сертификат.',
	is_copy: 'Признак: Имитация внешнего вида легитимного сайта.',
};

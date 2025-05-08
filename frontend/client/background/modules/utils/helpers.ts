import { IGNORE_URLS } from '@/background/modules/utils/constants';

const isIgnoredUrl = (url: string) => {
	return IGNORE_URLS.some((sub) => url.includes(sub));
};

export const BackgroundUtils = { isIgnoredUrl };

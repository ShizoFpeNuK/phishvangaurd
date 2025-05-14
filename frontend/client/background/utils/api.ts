import { ServerTypes } from './api.types';

export class ServerApi {
	// TODO: Обработка ошибок
	static analyzeUrl = async (url: string): Promise<ServerTypes.IAnalyzeUrl> => {
		const res = await fetch('http://127.0.0.1:8000/api/analyze', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url }),
		});

		return res.json() as Promise<ServerTypes.IAnalyzeUrl>;
	};
}

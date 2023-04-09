export function TranslateReleaseToRussian(season: string) {
	switch (season) {
		case 'winter':
			return 'Экшен';
		case 'summer':
			return 'Лето';
		case 'autumn':
			return 'Осень';
		case 'spring':
			return 'Весна';
		default:
			return '';
	}
}
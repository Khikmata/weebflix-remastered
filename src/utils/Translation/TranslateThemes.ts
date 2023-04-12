export function TranslateThemesToRussian(theme: string) {
	const themeNames = ['Adult Cast', 'Anthropomorphic', 'CGDCT', 'Childcare', 'Combat Sports', 'Detective',
		'Educational', 'Gag Humor', 'Gore', 'Harem', 'High Stakes Game', 'Historical', 'Love Polygon',
		'Idols(Female)', 'Mythology', 'Parody', 'Psychological', 'Racing', 'Reverse Harem', 'School', 'Space',
		'Time Travel', 'Vampire', 'Video Game', 'Ecchi', 'Erotica', 'Hentai'];
	const index = themeNames.indexOf(theme);
	switch (index) {
		case 0:
			return 'Взрослый каст';
		case 1:
			return 'Антропоморфный';
		case 2:
			return 'CGDCT';
		case 3:
			return 'Дети';
		case 4:
			return 'Боевой спорт';
		case 5:
			return 'Детектив';
		case 6:
			return 'Образовательный';
		case 7:
			return 'Шутки-приколы';
		case 8:
			return 'Жестокость';
		case 9:
			return 'Гарем';
		case 10:
			return 'Батлрояль';
		case 11:
			return 'Исторический';
		case 12:
			return 'Любовный треугольник';
		case 13:
			return 'Айдолы';
		case 14:
			return 'Мифология';
		case 15:
			return 'Пародия';
		case 16:
			return 'Психологический';
		case 17:
			return 'Гонки';
		case 18:
			return 'Обратный гарем';
		case 19:
			return 'Школа';
		case 20:
			return 'Космос';
		case 21:
			return 'Путешествие во времени';
		case 22:
			return 'Вампиры';
		case 23:
			return 'Видео игра';
		case 24:
			return 'Эччи';
		case 25:
			return 'Эротика';
		case 26:
			return 'Хентай';
		default:
			return '';
	}
}
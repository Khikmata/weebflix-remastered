export function TranslateThemesToRussian(theme: string) {
	const themeNames = ['Adult Cast', 'Boys Love', 'Girls Love', 'Anthropomorphic', 'CGDCT', 'Childcare', 'Combat Sports', 'Detective',
		'Educational', 'Gag Humor', 'Gore', 'Harem', 'High Stakes Game', 'Historical', 'Love Polygon',
		'Idols(Female)', 'Mythology', 'Parody', 'Psychological', 'Racing', 'Reverse Harem', 'School', 'Space',
		'Time Travel', 'Vampire', 'Video Game', 'Ecchi', 'Erotica', 'Hentai'];
	const index = themeNames.indexOf(theme);
	switch (index) {
		case 0:
			return 'Взрослый каст';
		case 1:
			return 'Яой';
		case 2:
			return 'Юри';
		case 3:
			return 'Антропоморфный';
		case 4:
			return 'НЯШНЫЙ)';
		case 5:
			return 'Дети';
		case 6:
			return 'Боевой спорт';
		case 7:
			return 'Детектив';
		case 8:
			return 'Образовательный';
		case 9:
			return 'Шутки-приколы';
		case 10:
			return 'Жестокость';
		case 11:
			return 'Гарем';
		case 12:
			return 'Батлрояль';
		case 13:
			return 'Исторический';
		case 14:
			return 'Любовный треугольник';
		case 15:
			return 'Айдолы';
		case 16:
			return 'Мифология';
		case 17:
			return 'Пародия';
		case 18:
			return 'Психологический';
		case 19:
			return 'Гонки';
		case 20:
			return 'Обратный гарем';
		case 21:
			return 'Школа';
		case 22:
			return 'Космос';
		case 23:
			return 'Путешествие во времени';
		case 24:
			return 'Вампиры';
		case 25:
			return 'Видео игра';
		case 26:
			return 'Эччи';
		case 27:
			return 'Эротика';
		case 28:
			return 'Хентай';
		default:
			return '';
	}
}
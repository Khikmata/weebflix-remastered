export function TranslateGenresToRussian(genre: string) {
	switch (genre) {
		case 'Action':
			return 'Экшен';
		case 'Adventure':
			return 'Приключения';
		case 'Cars':
			return 'Машины';
		case 'Comedy':
			return 'Комедия';
		case 'Dementia':
			return 'Деменция';
		case 'Demons':
			return 'Демоны';
		case 'Mystery':
			return 'Мистика';
		case 'Drama':
			return 'Драма';
		case 'Ecchi':
			return 'Этти';
		case 'Fantasy':
			return 'Фэнтези';
		case 'Game':
			return 'Игры';
		case 'Hentai':
			return 'Хентай';
		case 'Historical':
			return 'Исторический';
		case 'Horror':
			return 'Ужасы';
		case 'Magic':
			return 'Магия';
		case 'Martial Arts':
			return 'Боевые Искусства';
		case 'Mecha':
			return 'Меха';
		case 'Music':
			return 'Музыка';
		case 'Parody':
			return 'Пародия';
		case 'Samurai':
			return 'Самураи';
		case 'Romance':
			return 'Романтика';
		case 'School':
			return 'Школа';
		case 'Sci-Fi':
			return 'Научная фантастика';
		case 'Shoujo':
			return 'Сёдзё';
		case 'Shoujo Ai':
			return 'Сёдзё-ай';
		case 'Shounen':
			return 'Сёнэн';
		case 'Shounen Ai':
			return 'Сёнэн-ай';
		case 'Space':
			return 'Космос';
		case 'Sports':
			return 'Спорт';
		case 'Super Power':
			return 'Суперспособности';
		case 'Vampire':
			return 'Вампиры';
		case 'Yaoi':
			return 'Яой';
		case 'Yuri':
			return 'Юри';
		default:
			return '';
	}
}
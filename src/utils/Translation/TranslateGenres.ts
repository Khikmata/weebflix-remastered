export function TranslateGenresToRussian(genre: string) {
	const genresNames = ['Action', 'Adventure', 'Avant Garde', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Isekai',
		'Mystery', 'Romance', 'Sci-fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense', 'Josei', 'Kids',
		'Seinen', 'Shoujo', 'Shounen'];
	const index = genresNames.indexOf(genre);
	switch (index) {
		case 0:
			return 'Экшен';
		case 1:
			return 'Приключения';
		case 2:
			return 'Безумие';
		case 3:
			return 'Комедия';
		case 4:
			return 'Драма';
		case 5:
			return 'Фэнтези';
		case 6:
			return 'Хоррор';
		case 7:
			return 'Исекай';
		case 8:
			return 'Мистика';
		case 9:
			return 'Романтика';
		case 10:
			return 'Научная фантастика';
		case 11:
			return 'Повседневность';
		case 12:
			return 'Спорт';
		case 13:
			return 'Сверхъестественное';
		case 14:
			return 'Триллер';
		case 15:
			return 'Джосей';
		case 16:
			return 'Для детей';
		case 17:
			return 'Сейнен';
		case 18:
			return 'Сёдзе';
		case 19:
			return 'Сёнен';
		default:
			return '';
	}
}
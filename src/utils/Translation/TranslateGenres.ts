export function TranslateGenresToRussian(genre: string) {
	const genresNames = ['Action', 'Adventure', 'Avant Garde', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Isekai',
		'Mystery', 'Romance', 'Sci-fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense', 'Josei', 'Kids',
		'Seinen', 'Shoujo', 'Shounen', 'Boys Love', 'Girls Love',];

	for (let i = 0; i < genresNames.length; i++) {
		const genreName = genresNames[i].toLowerCase();
		if (genre.toLowerCase().includes(genreName)) {
			switch (genresNames[i]) {
				case 'Action':
					return 'Экшен';
				case 'Adventure':
					return 'Приключения';
				case 'Avant Garde':
					return 'Безумие';
				case 'Comedy':
					return 'Комедия';
				case 'Drama':
					return 'Драма';
				case 'Fantasy':
					return 'Фэнтези';
				case 'Horror':
					return 'Хоррор';
				case 'Isekai':
					return 'Исекай';
				case 'Mystery':
					return 'Мистика';
				case 'Romance':
					return 'Романтика';
				case 'Sci-fi':
					return 'Научная фантастика';
				case 'Slice of Life':
					return 'Повседневность';
				case 'Sports':
					return 'Спорт';
				case 'Supernatural':
					return 'Сверхъестественное';
				case 'Suspense':
					return 'Триллер';
				case 'Josei':
					return 'Джосей';
				case 'Kids':
					return 'Для детей';
				case 'Seinen':
					return 'Сейнен';
				case 'Shoujo':
					return 'Сёдзе';
				case 'Shounen':
					return 'Сёнен';
				case 'Boys Love':
					return 'Яой';
				case 'Girls Love':
					return 'Юри';
				default:
					return '';
			}
		}
	}
}
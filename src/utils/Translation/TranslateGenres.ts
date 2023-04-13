import { genresNames } from "../DataTypes/GenresData";

export function TranslateGenresToRussian(genre: string) {

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
				case 'Adult Cast':
					return 'Для взрослых';
				case 'Anthropomorphic':
					return 'Антропоморфизм';
				case 'CGDCT':
					return 'CGDCT';
				case 'Childcare':
					return 'Уход за детьми';
				case 'Combat Sports':
					return 'Боевые виды спорта';
				case 'Detective':
					return 'Детектив';
				case 'Educational':
					return 'Образовательное';
				case 'Gag Humor':
					return 'Шутки';
				case 'Gore':
					return 'Жестокость';
				case 'Harem':
					return 'Гарем';
				case 'High Stakes Game':
					return 'Батлрояль';
				case 'Historical':
					return 'Исторический';
				case 'Love Polygon':
					return 'Любовный треугольник';
				case 'Idols(Female)':
					return 'Айдолы';
				case 'Mythology':
					return 'Мифология';
				case 'Parody':
					return 'Пародия';
				case 'Psychological':
					return 'Психологический';
				case 'Racing':
					return 'Гонки';
				case 'Reverse Harem':
					return 'Обратный гарем';
				case 'School':
					return 'Школа';
				case 'Space':
					return 'Космос';
				case 'Time Travel':
					return 'Путешествие во времени';
				case 'Vampire':
					return 'Вампиры';
				case 'Video Game':
					return 'Видео игра';
				case 'Ecchi':
					return 'Эччи';
				case 'Erotica':
					return 'Эротика';
				case 'Hentai':
					return 'Хентай';
				case 'Gourmet':
					return 'Гастрономическое';
				case 'Workplace':
					return 'Рабочее место';
				case 'Visual Arts':
					return 'Искусство';
				case 'Survival':
					return 'Выживание';
				case 'Super Power':
					return 'Суперсила';
				case 'Team Sports':
					return 'Командные виды спорта';
				case 'Showbiz':
					return 'Шоу-бизнес';
				case 'Samurai':
					return 'Самурай';
				case 'Strategy Game':
					return 'Стратегия';
				case 'Reincarnation':
					return 'Реинкарнация';
				case 'Romantic Subtext':
					return 'Романтическая подоплека';
				case 'Pets':
					return 'Домашние животные';
				case 'Performing Arts':
					return 'Театральное искусство';
				case 'Otaku Culture':
					return 'Отаку-культура';
				case 'Music':
					return 'Музыка';
				case 'Military':
					return 'Военный';
				case 'Medical':
					return 'Медицинский';
				case 'Mecha':
					return 'Меха';
				case 'Martial arts':
					return 'Боевые искусства';
				case 'Organized Crime':
					return 'Криминал';
				case 'Mahou Shoujo':
					return 'Махо-сёдзё';
				case 'Magical Sex Shift':
					return 'Смена пола';
				case 'Iyashikei':
					return 'Отдых';
				case 'Idols (Male)':
					return 'Айдолы (мужчины)';
				case 'Award Winning':
					return 'Номинированные';
				case 'Crossdressing':
					return 'Кроссдрессинг';
				default:
					return genresNames[i];
			}
		}
	}
}
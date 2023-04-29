//Типы селектов
export enum DropDownTypeEnum {
	GENRES = 'genres',
	TYPES = 'types',
	SORT = 'sort',
	RATING = 'rating',
	SEASON = 'season',
	EPISODE = 'episode',
	STUDIO = 'studio',
	STATUS = 'status',
}


//Названия жанров
export const genresNames = [
	'Action', 'Adventure', 'Avant Garde', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Isekai',
	'Mystery', 'Romance', 'Sci-fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense', 'Josei', 'Kids',
	'Seinen', 'Shoujo', 'Shounen', 'Boys Love', 'Girls Love', 'Adult Cast', 'Anthropomorphic', 'CGDCT', 'Childcare',
	'Combat Sports', 'Detective', 'Educational', 'Gag Humor', 'Gore', 'Harem', 'High Stakes Game', 'Historical', 'Love Polygon',
	'Idols (Female)', 'Mythology', 'Parody', 'Psychological', 'Racing', 'Reverse Harem', 'School', 'Space',
	'Time Travel', 'Vampire', 'Video Game', 'Ecchi', 'Erotica', 'Hentai', 'Gourmet', 'Workplace', 'Visual Arts', 'Survival', 'Super Power', 'Team Sports',
	'Showbiz', 'Samurai', 'Strategy Game', 'Reincarnation', 'Romantic Subtext', 'Pets', 'Performing Arts', 'Otaku Culture', 'Music', 'Military', 'Medical',
	'Mecha', 'Martial arts', 'Organized Crime', 'Mahou Shoujo', 'Magical Sex Shift', 'Iyashikei', 'Idols (Male)', 'Award Winning', 'Crossdressing', 'Delinquents'
]
//Название типов
export const AnimeTypes = ['tv', 'movie', 'ova', 'special', 'ona', 'music']
//Название рейтингов
export const AnimeRating = [
	'G - All Ages',
	'PG - Children',
	'PG-13 - Teens 13 or older',
	'R - 17+ (violence & profanity)',
	'R+ - Mild Nudity',
	'Rx - Hentai'
];

export enum AnimeRatingQuery {
	'G - All Ages' = 'g',
	'PG - Children' = 'pg',
	'PG-13 - Teens 13 or older' = 'pg13',
	'R - 17+' = 'r17',
	'R+ - Mild Nudity' = 'r',
	'Rx - Hentai' = 'rx',
}
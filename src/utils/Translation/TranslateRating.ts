export function TranslateRatingToRussian(rating: string) {
	switch (rating) {
		case 'G - All Ages':
			return '0+';
		case 'PG - Children':
			return '6+';
		case 'PG - 13 - Teens 13 or older':
			return '13+';
		case 'R - 17+ (violence & profanity)':
			return '18+';
		case 'R + - Mild Nudity':
			return '18+';
		case 'Rx - Hentai':
			return '18+'
		default:
			return '';
	}
}
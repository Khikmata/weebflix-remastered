export function TranslateStatusToRussian(status: string) {
	switch (status) {
		case 'Not yet aired':
			return 'Еще не выходит';
		case 'Currently Airing':
			return 'Онгоинг';
		case 'Finished Airing':
			return 'Вышло';
		default:
			return '';
	}
}
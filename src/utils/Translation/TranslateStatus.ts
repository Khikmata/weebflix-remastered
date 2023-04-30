export function TranslateStatusToRussian(status: string) {
	console.log(status)
	switch (status) {
		case 'Not yet aired':
			return 'Еще не выходит';
		case 'Currently Airing':
			return 'Онгоинг';
		case 'Finished Airing':
			return 'Вышло';
		case 'upcoming':
			return 'Еще не выходит';
		case 'airing':
			return 'Онгоинг';
		case 'complete':
			return 'Вышло';
		default:
			return status;
	}
}
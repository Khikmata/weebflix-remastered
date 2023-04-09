export function TranslateTypeToRussian(type: string) {
	switch (type) {
		case 'TV':
			return 'ТВ-Сериал';
		case 'MOVIE':
			return 'Фильм';
		case 'ONA':
			return 'Она';
		case 'OVA':
			return 'Ова';
		case 'SPECIAL':
			return 'Спешл';
		case 'MUSIC':
			return 'Музыкальный';
		default:
			return '';
	}
}
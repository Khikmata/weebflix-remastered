import { IData } from './../types/GetAnimeTypes';

export const ColorRating = (item: IData) => {
	if (Number(item.score) > 8.8) {
		return '#79F9F9';
	}
	if (Number(item.score) < 8.8 && Number(item.score) > 7) {
		return '#ABE96E'
	}
	if (Number(item.score) < 7 && Number(item.score) > 5) {
		return '#F0F0F0'
	}
	if (Number(item.score) < 4 && Number(item.score) > 0) {
		return '#F97979'
	}
	return '#F0F0F0';

}
export interface IAired {
	from: string;
	to: string;
}
export interface IImages {
	webp: IImagesSettings;
	jpg: IImagesSettings;
}
export interface IImagesSettings {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}
export interface ITrailer {
	youtube_id: string;
	embed_url: string;
}
export interface IMoreDetails {
	mal_id: string;
	type: string;
	name: string;
	url: string;
}
export interface IPaginationItems {
	count: number;
	total: number;
	per_page: number;
}
export interface IGenres {
	name: string;
	count: number;
	mal_id: number;
}
export enum AnimeTypesEnum {
	'tv',
	'movie',
	'ova',
	'special',
	'ona',
	'music',
}
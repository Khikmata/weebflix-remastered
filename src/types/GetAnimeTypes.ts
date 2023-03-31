import { TypeLocalistion } from "./AnimeLocalisation";


export interface IImagesSettings {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}

export interface IImages {
	webp: IImagesSettings;
	jpg: IImagesSettings;
}
interface ITrailer {
	youtube_id: string;
	embed_url: string;
}

export interface IData {
	mal_id: string;
	url: string;
	images: IImages;
	title_english: string;
	title: string;
	type: string;
	episodes: string;
	status: string;
	rank: number;
	score: Float32Array;
}

interface IAired {
	from: string;
	to: string;
}

export interface IMoreDetails {
	mal_id: string;
	type: string;
	name: string;
	url: string;
}

export interface IDetails {
	mal_id: string;
	images: IImages;
	trailer: ITrailer;
	title: string;
	title_english: string;
	title_japanese: string;
	type: TypeLocalistion;
	episodes: number;
	status: string;
	aired: IAired;
	duration: string;
	rating: string;
	score: number;
	scored_by: number;
	rank: number;
	popularity: number;
	synopsis: string;
	background: string;
	season: string;
	year: number;
	studios: IMoreDetails[];
	genres: IMoreDetails[];
	relation: string;
}

interface IEntry {
	images: IImages;
	mal_id: string;
	title: string;
	url: string;
}


export interface IRecommendations {
	mal_id: string;
	entry: IEntry;
	title: string;
	votes: number;
}

interface IPaginationItems {
	count: number;
	total: number;
	per_page: number;
}

interface IPagination {
	current_page: number;
	has_next_page: boolean;
	items: IPaginationItems
	last_visible_page: number;
}


export interface IGetAnime {
	pagination: IPagination;
	data: IData[];
}
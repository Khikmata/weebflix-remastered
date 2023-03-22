

export interface IIWebp {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}

export interface IImages {
	webp: IIWebp;
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

interface IEntry {
	images: IImages;
	mal_id: number;
	title: string;
	url: string;
}

export interface IRecommendations {
	entry: IEntry;
	url: string;
	votes: number;
}

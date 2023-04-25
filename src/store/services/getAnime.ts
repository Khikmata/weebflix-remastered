
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenres, IImages } from '../../types/DetailsTypes';
import { IAnimeFilterQueries, IData, IDetails, IProducers, IRecommendations, ISeasons } from '../../types/FetchTypes';

export interface seasonQuery {
	year: string,
	season: string
}



export const AnimeApi = createApi({
	reducerPath: 'animeAPI',
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
	endpoints: (builder) => ({
		getCurrentSeason: builder.query<IData[], number>({
			query: () => ({
				url: '/seasons/now',
			}),
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getUpcomingSeason: builder.query<IData[], number>({
			query: () => ({
				url: '/seasons/upcoming',
			}),
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getRecentAnimeRecommendations: builder.query<IRecommendations[], number>({
			query: (id) => ({
				url: `anime/${id}/recommendations`
			}),
			transformResponse: (response: { data: IRecommendations[] }, meta, arg) => response.data,
		}),
		getAnimeDetails: builder.query<IDetails, string>({
			query: (id) => ({ url: `/anime/${id}/full` }),
			transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
		}),
		getAnimePictures: builder.query<IImages, string>({
			query: (id) => ({ url: `/anime/${id}/pictures` }),
			transformResponse: (response: { data: IImages }) => response.data,
		}),
		getTopAnime: builder.query<IData[], number>({
			query: () => ({
				url: '/top/anime',
			}),
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getAnimeNews: builder.query<IDetails, string>({
			query: (id) => ({ url: `/anime/${id}/full` }),
			transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
		}),
		getAnimeSearch: builder.query<IData[], IAnimeFilterQueries>({
			query: ({ page, limit, q, type, score, min_score, max_score, status, rating, genres, genres_exclude, order_by, sort, letter, producers, start_date, end_date, sfw }) => {
				let url = 'anime?';
				if (page) url += `page=${page}`;
				if (limit) url += `page=${limit}`
				if (q) url += `q=${q}&`;
				if (type) url += `type=${type}&`;
				if (min_score) url += `min_score=${min_score}&`;
				if (max_score) url += `max_score=${max_score}&`;
				if (rating) url += `rating=${rating}&`;
				if (sfw) url += `sfw=${sfw}&`
				if (genres) url += `genres=${genres}&`;
				if (order_by) url += `order_by=${order_by}&`;
				if (sort) url += `sort=${sort}&`;
				if (letter) url += `letter=${letter}&`;
				if (start_date) url += `start_date=${start_date}&`;
				if (producers) url += `producers=${producers}&`;
				if (end_date !== '2023') url += `end_date=${end_date}`;
				return { url };
			},
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getAnimeBySeason: builder.query<IData[], string>({
			query: (seasonQuery) => ({ url: `https://api.jikan.moe/v4/seasons/${seasonQuery}` }),
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getAnimeRandom: builder.query<IDetails, string>({
			query: () => ({ url: `https://api.jikan.moe/v4/random/anime` }),
			transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
		}),
		getAnimeSeasons: builder.query<ISeasons[], string>({
			query: () => ({ url: `https://api.jikan.moe/v4/seasons` }),
			transformResponse: (response: { data: ISeasons[] }) => response.data,
		}),
		getAnimeProducers: builder.query<IProducers[], string>({
			query: () => ({ url: `https://api.jikan.moe/v4/producers` }),
			transformResponse: (response: { data: IProducers[] }) => response.data,
		}),
		getAnimeCharacters: builder.query<any[], string>({
			query: (id) => ({ url: `https://api.jikan.moe/v4/anime/${id}/characters` }),
			transformResponse: (response: { data: any[] }) => response.data,
		}),
		getAnimeGenres: builder.query<IGenres[], string>({
			query: () => ({ url: '/genres/anime' }),
			transformResponse: (response: { data: IGenres[] }) => {
				return response.data;
			},
		}),
	})
})
export const { } = AnimeApi;
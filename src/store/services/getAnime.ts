import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenres, IImages } from '../../types/DetailsTypes';
import { IAnimeFilterQueries, IData, IDetails, IRecommendations } from '../../types/FetchTypes';

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
		getAnimeImages: builder.query<IImages, string>({
			query: (id) => ({ url: `/anime/${id}/pictures` }),
			transformResponse: (response: { data: IImages }) => response.data,
		}),
		getTopAnime: builder.query<IData[], number>({
			query: () => ({
				url: '/top/anime',
			}),
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getAnimeSearch: builder.query<IData[], IAnimeFilterQueries>({
			query: ({ page, limit, q, type, score, min_score, max_score, status, rating, genres, genres_exclude, order_by, sort, letter, producers, start_date, end_date }) => {
				let url = 'anime?';

				if (min_score) url += `min_score=${min_score}&`;
				if (max_score) url += `max_score=${max_score}&`;
				if (start_date) url += `start_date=${start_date}&`;
				if (end_date) url += `end_date=${end_date}&`;
				if (order_by) url += `order_by=${order_by}&`;
				if (sort) url += `sort=${sort}&`;
				if (genres) url += `genres=${genres}&`;
				if (q) url += `q=${q}&`;
				if (letter) url += `letter=${letter}&`;
				if (type) url += `type=${type}&`;

				return { url };
			},
			transformResponse: (response: { data: IData[] }) => response.data,
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
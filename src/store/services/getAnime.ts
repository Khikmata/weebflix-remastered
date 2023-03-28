import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDetails, IGetAnime, IRecommendations } from '../../types/GetAnimeTypes';
import { IData, IImages } from './../../types/GetAnimeTypes';

export const AnimeApi = createApi({
	reducerPath: 'animeAPI',
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
	endpoints: (builder) => ({
		getCurrentSeason: builder.query<IGetAnime, number>({
			query: () => ({
				url: '/seasons/now',
				transformResponse: (response: { data: IData }) => response.data,
			})
		}),
		getUpcomingSeason: builder.query<IGetAnime, number>({
			query: () => ({
				url: '/seasons/upcoming',
				transformResponse: (response: { data: IData }) => response.data,
			})
		}),
		getRecentAnimeRecommendations: builder.query<IRecommendations[], number>({
			query: (id) => ({ url: `anime/${id}/recommendations` }),
			transformResponse: (response: { data: IRecommendations[] }, meta, arg) => response.data,
		}),
		getAnimeDetails: builder.query<IDetails, string>({
			query: (id) => ({ url: `/anime/${id}/full` }),
			transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
		}),
		getAnimeImages: builder.query<IImages, string>({
			query: (id) => ({ url: `/anime/${id}/pictures` }),
			transformResponse: (response: { data: IImages }) => response.data,
		})
	})
})
export const { useGetCurrentSeasonQuery } = AnimeApi;
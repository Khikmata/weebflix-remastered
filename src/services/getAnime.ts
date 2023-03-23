import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IData, IGetAnime, IRecommendations } from '../types/GetAnimeTypes';

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
	})
})
export const { useGetCurrentSeasonQuery } = AnimeApi;
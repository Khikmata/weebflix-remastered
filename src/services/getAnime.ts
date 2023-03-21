import { IRecommendations, IData } from './../types/GetAnimeTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AnimeApi = createApi({
	reducerPath: 'animeAPI',
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
	endpoints: (builder) => ({
		getCurrentSeason: builder.query({
			query: () => ({
				url: '/seasons/now',
				transformResponse: (response: { data: IData }) => response.data,
			})
		}),
		getRecentAnimeRecommendations: builder.query<any, any>({
			query: (id) => ({ url: `anime/${id}/recommendations` }),
			transformResponse: (response: { data: IRecommendations }, meta, arg) => response.data,
		})
	})
})
export const { useGetCurrentSeasonQuery } = AnimeApi;
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { IData, IDetails, IRecommendations } from '@store/types/FetchTypes'

export interface seasonQuery {
  year: string
  season: string
}

const staggeredBaseQuery = retry(
  fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4' }),
  {},
)

export const AnimeApi = createApi({
  reducerPath: 'animeAPI',
  tagTypes: ['Player, Search'],
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getCurrentSeason: builder.query<IData[], void>({
      query: () => ({
        url: '/seasons/now',
      }),
      transformResponse: (response: { data: IData[] }) => response.data,
    }),
    getUpcomingSeason: builder.query<IData[], void>({
      query: () => ({
        url: '/seasons/upcoming',
      }),
      transformResponse: (response: { data: IData[] }) => response.data,
    }),
    getRecentAnimeRecommendations: builder.query<IRecommendations[], number>({
      query: (id) => ({
        url: `anime/${id}/recommendations`,
      }),
      transformResponse: (response: { data: IRecommendations[] }, meta, arg) =>
        response.data,
    }),
    getTopAnime: builder.query<IData[], void>({
      query: () => ({
        url: '/top/anime',
      }),
      transformResponse: (response: { data: IData[] }) => response.data,
    }),
    getAnimeBySeason: builder.query<IData[], string>({
      query: (seasonQuery) => ({
        url: `/seasons/${seasonQuery}`,
      }),
      transformResponse: (response: { data: IData[] }) => {
        return response.data
      },
    }),
    getAnimeRandom: builder.query<IDetails, any>({
      query: () => ({ url: `/random/anime` }),
      transformResponse: (response: { data: IDetails }) => response.data,
    }),
  }),
})

export const { endpoints } = AnimeApi

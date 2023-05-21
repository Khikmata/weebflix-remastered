
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { IGenres, IImages } from '../../types/DetailsTypes'
import {
  IAnimeFilterQueries,
  IData,
  IDetails,
  IGetCharacters,
  IProducers,
  IRecommendations,
  ISeasons,
} from '../../types/FetchTypes'

export interface seasonQuery {
  year: string
  season: string
}



const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4' }), {
})

export const AnimeApi = createApi({
  reducerPath: 'animeAPI',
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
    getTopAnime: builder.query<IData[], void>({
      query: () => ({
        url: '/top/anime',
      }),
      transformResponse: (response: { data: IData[] }) => response.data,
    }),
    getAnimeNews: builder.query<IDetails, string>({
      query: (id) => ({ url: `/anime/${id}/full` }),
      transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
    }),
    getAnimeBySeason: builder.query<IData[], string>({
      query: (seasonQuery) => ({
        url: `https://api.jikan.moe/v4/seasons/${seasonQuery}`,
      }),
      transformResponse: (response: { data: IData[] }) => {
        return response.data
      },
    }),
    getAnimeRandom: builder.query<IDetails, any>({
      query: () => ({ url: `https://api.jikan.moe/v4/random/anime` }),
      transformResponse: (response: { data: IDetails }) => response.data,
    }),
    getAnimeSeasons: builder.query<ISeasons[], void | string>({
      query: () => ({ url: `https://api.jikan.moe/v4/seasons` }),
      transformResponse: (response: { data: ISeasons[] }) => {
        return (response.data = response.data.filter((season) => season.year > 1963))
      },
    }),
    getAnimeProducers: builder.query<IProducers[], void | string>({
      query: () => ({ url: `https://api.jikan.moe/v4/producers` }),
      transformResponse: (response: { data: IProducers[] }) => response.data,
    }),
    getAnimeCharacters: builder.query<IGetCharacters[], string>({
      query: (id) => ({
        url: `https://api.jikan.moe/v4/anime/${id}/characters`,
      }),
      transformResponse: (response: { data: IGetCharacters[] }) => response.data,
    }),
    getAnimeGenres: builder.query<IGenres[], void>({
      query: () => ({ url: '/genres/anime' }),
      transformResponse: (response: { data: IGenres[] }) => {
        return response.data
      },
    }),
    getAnimePlayer: builder.query<IGenres[], string>({
      query: (url) => ({
        url: `anime/gogoanime/watch/${url}-episode-1?server=gogocdn`,
      }),
      transformResponse: (response: { data: IGenres[] }) => {
        return response.data
      },
    }),
  }),
})

export const { } = AnimeApi

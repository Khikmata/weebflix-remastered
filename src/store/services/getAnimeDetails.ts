import { IImages, IRelations } from '@store/types/DetailsTypes'
import { IDetails, IGetCharacters } from '@store/types/FetchTypes'
import { AnimeApi } from './getAnime'

export const getAnimeDetails = AnimeApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimeDetails: builder.query<IDetails, string>({
      query: (id) => ({ url: `/anime/${id}/full` }),
      transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
    }),
    getAnimePictures: builder.query<IImages, string>({
      query: (id) => ({ url: `/anime/${id}/pictures` }),
      transformResponse: (response: { data: IImages }) => response.data,
    }),
    getAnimeCharacters: builder.query<IGetCharacters[], string>({
      query: (id) => ({
        url: `/anime/${id}/characters`,
      }),
      transformResponse: (response: { data: IGetCharacters[] }) => response.data,
    }),
    getAnimeNews: builder.query<IDetails, string>({
      query: (id) => ({ url: `/anime/${id}/full` }),
      transformResponse: (response: { data: IDetails }, meta, arg) => response.data,
    }),
    getAnimeRelations: builder.query<IRelations[], void | string>({
      query: (id) => ({ url: `/anime/${id}/relations` }),
      transformResponse: (response: { data: IRelations[] }) => response.data,
    }),
  }),
})
export const { endpoints } = getAnimeDetails

import { IGenres } from '@store/types/DetailsTypes'
import { IProducers, ISeasons } from '@store/types/FetchTypes'
import { AnimeApi } from './AnimeApi'

export const AnimeDataApi = AnimeApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimeSeasons: builder.query<ISeasons[], void | string>({
      query: () => ({ url: `/seasons` }),
      transformResponse: (response: { data: ISeasons[] }) => {
        return (response.data = response.data.filter(
          (season) => Number(season.year) > 1963,
        ))
      },
    }),
    getAnimeGenres: builder.query<IGenres[], void>({
      query: () => ({ url: '/genres/anime' }),
      transformResponse: (response: { data: IGenres[] }) => {
        return response.data
      },
    }),
    getAnimeProducers: builder.query<IProducers[], void | string>({
      query: () => ({ url: `/producers` }),
      transformResponse: (response: { data: IProducers[] }) => response.data,
    }),
  }),
})
export const { endpoints: dataEndpoints } = AnimeDataApi

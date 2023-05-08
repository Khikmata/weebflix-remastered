import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { IAnimeFilterQueries, IGetAnime } from '../../types/FetchTypes'

export interface seasonQuery {
  year: string
  season: string
}
const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4' }), {
  maxRetries: 3,
})

export const SearchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getAnimeSearch: builder.query<IGetAnime, IAnimeFilterQueries>({
      query: ({
        page,
        limit,
        q,
        type,
        min_score,
        max_score,
        status,
        rating,
        genres,
        genres_exclude,
        order_by,
        sort,
        letter,
        producers,
        start_date,
        end_date,
        sfw,
      }) => {
        let url = 'anime?'
        if (page) url += `page=${page}&`
        if (limit) url += `limit=${limit}&`
        if (q) url += `q=${q}&`
        if (type) url += `type=${type}&`
        if (!status && min_score) url += `min_score=${min_score}&`
        if (!status && max_score) url += `max_score=${max_score}&`
        if (status) url += `status=${status}&`
        if (rating) url += `rating=${rating}&`
        if (sfw) url += `sfw=${sfw}&`
        if (genres) url += `genres=${genres}&`
        if (order_by) url += `order_by=${order_by}&`
        if (sort) url += `sort=${order_by === ('popularity' || 'rank' || 'mal_id') ? !sort : sort}&`
        if (letter) url += `letter=${letter}&`
        if (start_date) url += `start_date=${start_date}&`
        if (producers) url += `producers=${producers}&`
        if (end_date !== '2023') url += `end_date=${end_date}`
        return { url }
      }
    }),
  }),
})

export const { } = SearchAPI

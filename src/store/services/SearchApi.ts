import { IAnimeFilterQueries, IGetAnime } from '@store/types/FetchTypes'
import { AnimeApi } from './AnimeApi'

export interface seasonQuery {
  year: string
  season: string
}

export const SearchAPI = AnimeApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimeBySearch: builder.query<IGetAnime, IAnimeFilterQueries>({
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
        if (min_score) url += `min_score=${min_score}&`
        if (max_score) url += `max_score=${max_score}&`
        if (status) url += `status=${status}&`
        if (rating) url += `rating=${rating}&`
        if (sfw) url += `sfw=${sfw}&`
        if (genres) url += `${genres.length !== 0 ? `genres=${genres}&` : ''}`
        if (order_by) url += `order_by=${order_by}&`
        if (sort)
          url += `sort=${order_by === 'popularity' ? (sort = 'asc') : sort}&`
        if (letter) url += `letter=${letter}&`
        if (producers) url += `producers=${producers}&`
        if (start_date !== '1980') url += `start_date=${start_date}-01-01&`
        if (end_date !== '2023') url += `end_date=${end_date}-01-01`
        return { url }
      },
    }),
  }),
})

export const { endpoints: searchEndpoints } = SearchAPI

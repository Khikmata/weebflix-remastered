import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAnimeFilterQueries, IDetails, IGenres, IGetGenres, IRecommendations } from '../../types/GetAnimeTypes';
import { IData, IImages } from './../../types/GetAnimeTypes';

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

				return { url };
			},
			transformResponse: (response: { data: IData[] }) => response.data,
		}),
		getAnimeGenres: builder.query<IGetGenres, string>({
			query: () => '/genres/anime',
			transformResponse: (response: { data: IGenres[] }) => {

				//Названия жанров
				const genresNames = ['Action', 'Adventure', 'Avant Garde', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Isekai',
					'Mystery', 'Romance', 'Sci-fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense', 'Josei', 'Kids',
					'Seinen', 'Shoujo', 'Shounen', 'Boys Love', 'Girls Love']

				//Названия тем
				const themeNames = ['Adult Cast', , 'Anthropomorphic', 'CGDCT', 'Childcare', 'Combat Sports', 'Detective',
					'Educational', 'Gag Humor', 'Gore', 'Harem', 'High Stakes Game', 'Historical', 'Love Polygon',
					'Idols(Female)', 'Mythology', 'Parody', 'Psychological', 'Racing', 'Reverse Harem', 'School', 'Space',
					'Time Travel', 'Vampire', 'Video Game', 'Ecchi', 'Erotica', 'Hentai']

				const genres: IGenres[] = [];
				const themes: IGenres[] = [];
				const filteredGenres = {
					genres, themes
				}

				for (const genre of response.data) {
					if (genresNames.includes(genre.name)) {
						genres.push(genre);
					} else if (themeNames.includes(genre.name)) {
						themes.push(genre);
					}
				}


				return filteredGenres
			},
		}),
	})
})
export const { } = AnimeApi;
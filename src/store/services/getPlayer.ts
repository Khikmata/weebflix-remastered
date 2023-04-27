
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { IPlayerData } from '../../types/FetchTypes';

const playerBaseQuery = retry(fetchBaseQuery({ baseUrl: 'https://api.consumet.org/' }), {
	maxRetries: 2,
})


export const PlayerApi = createApi({
	reducerPath: 'playerAPI',
	baseQuery: playerBaseQuery,
	endpoints: (builder) => ({
		getAnimePlayer: builder.query<IPlayerData, string>({
			query: (url) => ({ url: `anime/gogoanime/watch/${url}-episode-1` }),
			//transformResponse: (response: { data: IPlayerData }, meta, arg) => response.data,
		}),
	})
})

export const { } = PlayerApi;


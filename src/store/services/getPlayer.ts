import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { IPlayerData } from '../../types/FetchTypes';

const playerBaseQuery = retry(
  fetchBaseQuery({ baseUrl: 'https://api.consumet.org/' }),
  {},
);
interface PlayerApiEndpoints {
  url: string;
  episodeNumber: number;
}

export const PlayerApi = createApi({
  reducerPath: 'playerAPI',
  baseQuery: playerBaseQuery,
  endpoints: (builder) => ({
    getAnimePlayer: builder.query<IPlayerData, PlayerApiEndpoints>({
      query: ({ url, episodeNumber }) => ({
        url: `anime/gogoanime/watch/${url}-episode-${episodeNumber}`,
      }),
    }),
  }),
});

export const { useGetAnimePlayerQuery } = PlayerApi;

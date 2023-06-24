import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPlayerData } from '../../types/FetchTypes';


interface PlayerApiEndpoints {
  url: string;
  episodeNumber: number;
}

const animeUrl = (url: string) => {
  return url.replace('https://www3.gogoanimes.fi/category/', '');
} 

export const PlayerApi = createApi({
  reducerPath: 'playerAPI',
  baseQuery: fetchBaseQuery({baseUrl:'https://api.consumet.org/'}) ,
  endpoints: (builder) => ({
    getAnimePlayer: builder.query<IPlayerData, PlayerApiEndpoints>({
      query: ({ url, episodeNumber }) => ({
        url: `anime/gogoanime/watch/${animeUrl(url)}-episode-${episodeNumber}`,
      }),
    }),
  }),
});

export const { useGetAnimePlayerQuery } = PlayerApi;

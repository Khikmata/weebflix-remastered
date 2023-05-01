import {
    IAired,
    IGenres,
    IImages,
    IMoreDetails,
    IPaginationItems,
    ITrailer,
} from './DetailsTypes'

export interface IGetAnime {
    pagination: IPagination
    data: IData[]
}
export interface IGetGenres {
    genres: IGenres[]
}

export interface IGetAnimeByFilter {
    pagination: IPagination
    data: IAnimeFilterQueries[]
}

export interface IAnimeFilterQueries {
    page?: number
    limit?: number
    q?: string
    type?: string
    score?: number
    min_score?: string
    max_score?: string
    status?: string | null
    rating?: string
    genres?: string
    genres_exclude?: string[]
    order_by?: string
    sort?: string
    letter?: string
    producers?: string
    start_date?: string
    end_date?: string
    sfw?: string
}

export interface IData {
    mal_id: string
    url: string
    images: IImages
    title_english: string
    title: string
    type: string
    episodes: string
    status: string
    rank: number
    score: Float32Array
}

export enum season {
    'winter',
    'spring',
    'summer',
    'fall',
}

export interface ISeasons {
    year: number
    seasons: string[]
}

interface ProducersTitle {
    title: string
}

export interface IProducers {
    titles: ProducersTitle[]
    count: number
    favorites: number
    mal_id: number
    url: string
    established: string
    about: string
}

export interface IDetails {
    url: string
    mal_id: string
    images: IImages
    trailer: ITrailer
    title: string
    title_english: string
    title_japanese: string
    type: string
    episodes: number
    status: string
    aired: IAired
    duration: string
    rating: string
    score: number
    scored_by: number
    rank: number
    popularity: number
    synopsis: string
    background: string
    season: string
    year: number
    studios: IMoreDetails[]
    genres: IMoreDetails[]
    relation: string
}

interface IEntry {
    images: IImages
    mal_id: string
    title: string
    url: string
}

export interface IRecommendations {
    mal_id: string
    entry: IEntry
    title: string
    votes: number
}

interface IPagination {
    current_page: number
    has_next_page: boolean
    items: IPaginationItems
    last_visible_page: number
}

export interface ISources {
    isM3U8: boolean
    quality: string
    url: string
}

export interface ICharacter {
    mal_id: number
    url: string
    images: IImages
    name: string
}

interface IVoiceActor {
    person: ICharacter
    language: string
}

export interface IGetCharacters {
    character: ICharacter
    role: string
    voice_actors: IVoiceActor
}

export interface IPlayerData {
    sources: ISources[]
}

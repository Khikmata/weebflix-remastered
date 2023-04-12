import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGenres } from '../../types/GetAnimeTypes';


export interface CounterState {
	maxScore: number;
	minScore: number;
	dateFrom: number;
	dateTo: number;
	genresQuery: string;
	genresName: string;
	searchQuery: string,
}


const initialState: CounterState = {
	maxScore: 10,
	minScore: 0,
	dateFrom: 1990,
	dateTo: 2023,
	genresQuery: '',
	genresName: '',
	searchQuery: '',
}

const slice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setMaxScore: (state, action: PayloadAction<number>) => {
			state.maxScore = action.payload;
		},
		setMinScore: (state, action: PayloadAction<number>) => {
			state.minScore = action.payload;
		},
		setDateFrom: (state, action: PayloadAction<number>) => {
			state.dateFrom = action.payload;
		},
		setDateTo: (state, action: PayloadAction<number>) => {
			state.dateTo = action.payload;
		},
		setGenre: (state, action: PayloadAction<IGenres>) => {
			state.genresQuery += `${action.payload.mal_id},`;
			state.genresName += `${action.payload.name}, `;
		},
		removeGenre: (state, action: PayloadAction<IGenres>) => {
			state.genresQuery = state.genresQuery.replace(`${action.payload.mal_id},`, '');
			state.genresName = state.genresName.replace(`${action.payload.name}, `, '');
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
	},
})

export const { reducer: SearchFilterReducer, actions: SearchFilterActions } = slice;

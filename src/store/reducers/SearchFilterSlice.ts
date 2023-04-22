import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGenres } from '../../types/DetailsTypes';



export interface CounterState {
	maxScore: number;
	minScore: number;
	dateFrom: number;
	dateTo: number;
	genresQuery: string;
	genresName: string[];
	searchQuery: string,
	typeQuery: string,
	typeDisplay: string[],
	ratingQuery: string,
	ratingDisplay: string[],
	producersQuery: string,
	producersDisplay: string[],
	sfw: string,
}


const initialState: CounterState = {
	maxScore: 10,
	minScore: 0,
	dateFrom: 1960,
	dateTo: 2024,
	searchQuery: '',
	genresQuery: '',
	genresName: [],
	typeQuery: '',
	typeDisplay: [],
	ratingQuery: '',
	ratingDisplay: [],

	producersQuery: '',
	producersDisplay: [],
	sfw: 'true',
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
			state.genresName.push(action.payload.name);
		},
		removeGenre: (state, action: PayloadAction<IGenres>) => {
			state.genresQuery = state.genresQuery.replace(`${action.payload.mal_id},`, '');
			const indexToRemove = state.genresName.findIndex(el => el === action.payload.name);
			if (indexToRemove !== 0) {
				state.genresName.splice(indexToRemove, 1);
			} else {
				state.genresName.shift();
			}
		},
		setType: (state, action) => {
			state.typeQuery = action.payload;
			state.typeDisplay[0] = (action.payload);
		},
		removeType: (state, action) => {
			state.typeQuery = state.typeQuery.replace(`${action.payload.mal_id}`, '');
			const indexToRemove = state.typeDisplay.findIndex(el => el === action.payload.name);
			if (indexToRemove !== 0) {
				state.typeDisplay.splice(indexToRemove, 1);
			} else {
				state.typeDisplay.shift();
			}
		},
		setRating: (state, action) => {
			state.ratingQuery = action.payload;
			state.ratingDisplay[0] = (action.payload);
		},
		removeRating: (state, action: PayloadAction<string>) => {
			state.ratingQuery = state.ratingQuery.replace(`${action.payload}`, '');
			state.ratingDisplay[0] = ('');
		},

		setProducer: (state, action) => {
			state.ratingQuery = action.payload;
			state.ratingDisplay[0] = (action.payload);
		},
		removeProducer: (state, action: PayloadAction<string>) => {
			state.ratingQuery = state.ratingQuery.replace(`${action.payload}`, '');
			state.ratingDisplay[0] = ('');
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
	},
})

export const { reducer: SearchFilterReducer, actions: SearchFilterActions } = slice;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGenres } from '../../types/DetailsTypes';
import { ISeasons } from '../../types/FetchTypes';
import { IProducers } from '../../types/FetchTypes';


export interface CounterState {
	genreData: IGenres[];
	producersData: IProducers[];
	seasonsData: ISeasons[];
}


const initialState: CounterState = {
	genreData: [],
	producersData: [],
	seasonsData: [],
}

const slice = createSlice({
	name: 'dropdownData',
	initialState,
	reducers: {
		setGenreData: (state, action: PayloadAction<IGenres[]>) => {
			state.genreData = action.payload;
		},
		setProducerData: (state, action) => {
			state.producersData = action.payload;
		},
		setSeasonData: (state, action: PayloadAction<ISeasons[]>) => {
			state.seasonsData = action.payload;
		},
	},
})

export const { reducer: DropDownDataReducer, actions: DropDownDataActions } = slice;

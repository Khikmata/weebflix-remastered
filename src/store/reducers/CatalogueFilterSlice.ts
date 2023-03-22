import { createSlice } from '@reduxjs/toolkit';

export const filterOptions = [
	"Актуальное",
	"Недавно вышедшее",
	"Скоро выйдет",
	"Самое ожидаемое"
]

export interface CounterState {
	activeFilterIndex: number
}


const initialState: CounterState = {
	activeFilterIndex: 0,
}

const slice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setActiveFilterIndex: (state, action) => {
			state.activeFilterIndex = action.payload;
		}
	},
})

export const { reducer: CatalogueFilterReducer, actions: CatalogueFilterActions } = slice;

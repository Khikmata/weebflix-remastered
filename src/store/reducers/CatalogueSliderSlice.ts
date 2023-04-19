import { createSlice } from '@reduxjs/toolkit';

export const filterOptions = [
	"Актуальное",
	"Скоро выйдет",
]

export interface CounterState {
	activeSliderIndex: number
}


const initialState: CounterState = {
	activeSliderIndex: 0,
}

const slice = createSlice({
	name: 'catalogueSlider',
	initialState,
	reducers: {
		setActiveCatalogueSliderIndex: (state, action) => {
			state.activeSliderIndex = action.payload;
		}
	},
})

export const { reducer: CatalogueSliderReducer, actions: CatalogueSliderActions } = slice;

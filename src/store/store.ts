import { combineReducers, configureStore } from "@reduxjs/toolkit";



import { AnimeApi } from "./services/getAnime";

import { CatalogueReducer } from "./reducers/CatalogueSlice";
import { CatalogueSliderReducer } from "./reducers/CatalogueSliderSlice";

import { dateFilterReducer, genreFilterReducer, ratingFilterReducer, scoreFilterReducer, searchFilterReducer, seasonFilterReducer, studioFilterReducer, typeFilterReducer } from "./reducers/Filters/";
import { PlayerApi } from "./services/getPlayer";
import { DropDownDataReducer } from "./reducers/DropDownDataSlice";


const rootReducer = combineReducers({
	[AnimeApi.reducerPath]: AnimeApi.reducer,
	[PlayerApi.reducerPath]: PlayerApi.reducer,

	catalogueSlider: CatalogueSliderReducer,
	catalogue: CatalogueReducer,

	dropDownData: DropDownDataReducer,

	dateFilter: dateFilterReducer,
	scoreFilter: scoreFilterReducer,
	genreFilter: genreFilterReducer,
	typeFilter: typeFilterReducer,
	ratingFilter: ratingFilterReducer,
	seasonsFilter: seasonFilterReducer,
	studioFilter: studioFilterReducer,
	searchFilter: searchFilterReducer
})


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AnimeApi.middleware).concat(PlayerApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

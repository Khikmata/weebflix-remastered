import { combineReducers, configureStore } from "@reduxjs/toolkit";




import { CatalogueReducer } from "./reducers/CatalogueSlice";
import { CatalogueSliderReducer } from "./reducers/CatalogueSliderSlice";
import { DropDownDataReducer } from "./reducers/DropDownDataSlice";
import { dateFilterReducer, genreFilterReducer, ratingFilterReducer, scoreFilterReducer, searchFilterReducer, seasonFilterReducer, studioFilterReducer, typeFilterReducer } from "./reducers/Filters/";


import { AnimeApi } from "./services/getAnime";
import { PlayerApi } from "./services/getPlayer";
import { SearchAPI } from "./services/getSearch";

const rootReducer = combineReducers({
	[AnimeApi.reducerPath]: AnimeApi.reducer,
	[PlayerApi.reducerPath]: PlayerApi.reducer,
	[SearchAPI.reducerPath]: SearchAPI.reducer,

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
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(AnimeApi.middleware)
			.concat(PlayerApi.middleware)
			.concat(SearchAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

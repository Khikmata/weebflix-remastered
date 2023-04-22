import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { CatalogueReducer } from "./reducers/CatalogueSlice";
import { CatalogueSliderReducer } from "./reducers/CatalogueSliderSlice";
import { SearchFilterReducer } from "./reducers/SearchFilterSlice";
import { AnimeApi } from "./services/getAnime";
import { SeasonReducer } from "./reducers/SeasonsSlice";

const rootReducer = combineReducers({
	[AnimeApi.reducerPath]: AnimeApi.reducer,
	catalogueSlider: CatalogueSliderReducer,
	catalogue: CatalogueReducer,
	searchFilter: SearchFilterReducer,
	seasonFilter: SeasonReducer,
})


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AnimeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

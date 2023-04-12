import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CatalogueFilterReducer } from "./reducers/CategorySlice";
import { SearchFilterReducer } from "./reducers/SearchFilterSlice";
import { AnimeApi } from "./services/getAnime";

const rootReducer = combineReducers({
	[AnimeApi.reducerPath]: AnimeApi.reducer,
	catalogueFilter: CatalogueFilterReducer,
	searchFilter: SearchFilterReducer,
})


export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AnimeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

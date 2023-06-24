import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authModalReducer } from './reducers/Auth/AuthModal'
import { CatalogueReducer } from './reducers/Catalogue/CatalogueSlice'
import { CatalogueSliderReducer } from './reducers/Catalogue/CatalogueSliderSlice'
import { DropdownDataReducer } from './reducers/Dropdown/DropdownDataSlice'
import {
  dateFilterReducer,
  genreFilterReducer,
  orderByFilterReducer,
  producersFilterReducer,
  ratingFilterReducer,
  scoreFilterReducer,
  searchFilterReducer,
  seasonFilterReducer,
  sortFilterReducer,
  statusFilterReducer,
  typeFilterReducer,
} from './reducers/Filters'
import { PlayerReducer } from './reducers/Player/PlayerSlice'

import { season } from 'types/FetchTypes'
import { AnimeApi, PlayerApi, SearchAPI } from './services'

const filterReducer = combineReducers({
  dateFilters: dateFilterReducer,
  sortFilters: sortFilterReducer,
  typeFilters: typeFilterReducer,
  genreFilters: genreFilterReducer,
  scoreFilters: scoreFilterReducer,
  ratingFilters: ratingFilterReducer,
  searchFilters: searchFilterReducer,
  statusFilters: statusFilterReducer,
  orderFilters: orderByFilterReducer,
  producerFilters: producersFilterReducer,
  seasonFilters: seasonFilterReducer,
})

const rootReducer = combineReducers({
  [AnimeApi.reducerPath]: AnimeApi.reducer,
  [PlayerApi.reducerPath]: PlayerApi.reducer,
  [SearchAPI.reducerPath]: SearchAPI.reducer,

  catalogueSlider: CatalogueSliderReducer,
  catalogue: CatalogueReducer,

  dropdownData: DropdownDataReducer,

  player: PlayerReducer,

  auth: authModalReducer,

  filterReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AnimeApi.middleware).concat(PlayerApi.middleware).concat(SearchAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

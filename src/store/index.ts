import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authModalReducer } from './reducers/Auth/AuthModalSlice'
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

import { CarouselReducer } from './reducers/Carousel/CarouselOptionsSlice'
import { CatalogueReducer } from './reducers/Catalogue/CatalogueSlice'
import { AnimeApi } from './services'
import { PlayerApi } from './services/getPlayer'

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

  dropdownData: DropdownDataReducer,

  carousel: CarouselReducer,
  catalogue: CatalogueReducer,

  player: PlayerReducer,

  auth: authModalReducer,

  filterReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AnimeApi.middleware)
      .concat(PlayerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { CatalogueReducer } from './reducers/CatalogueSlice'
import { CatalogueSliderReducer } from './reducers/CatalogueSliderSlice'

import { PlayerReducer } from './reducers/PlayerSlice'
import { AnimeApi } from './services/getAnime'
import { PlayerApi } from './services/getPlayer'
import { SearchAPI } from './services/getSearch'

import { authModalReducer } from './reducers/Auth/AuthModal'
import { DropdownDataReducer } from './reducers/DropdownDataSlice'
import { filterReducers } from './reducers/Filters'

const rootReducer = combineReducers({
  [AnimeApi.reducerPath]: AnimeApi.reducer,
  [PlayerApi.reducerPath]: PlayerApi.reducer,
  [SearchAPI.reducerPath]: SearchAPI.reducer,

  catalogueSlider: CatalogueSliderReducer,
  catalogue: CatalogueReducer,

  dropdownData: DropdownDataReducer,

  player: PlayerReducer,

  filters: filterReducers,

  auth: authModalReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AnimeApi.middleware)
      .concat(PlayerApi.middleware)
      .concat(SearchAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

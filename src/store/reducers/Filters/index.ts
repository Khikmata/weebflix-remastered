
import { combineReducers } from '@reduxjs/toolkit'
import { dateFilterActions, dateFilterReducer } from './DateFilterSlice'
import { genreFilterActions, genreFilterReducer } from './GenreFilterSlice'
import { orderByFilterReducer } from './OrderFilterSlice'
import { producersFilterActions, producersFilterReducer } from './ProducerFilterSlice'
import { ratingFilterActions, ratingFilterReducer } from './RatingFilterSlice'
import { scoreFilterActions, scoreFilterReducer } from './ScoreFilterSlice'
import { searchFilterActions, searchFilterReducer } from './SearchFilterSlice'
import { seasonFilterActions, seasonFilterReducer } from './SeasonsFilterSlice'
import { sortFilterReducer } from './SortFilterSlice'
import { statusFilterReducer } from './StatusFilterSlice'
import { typeFilterActions, typeFilterReducer } from './TypeFilterSlice'

export {
  dateFilterActions,
  genreFilterActions,
  ratingFilterActions,
  scoreFilterActions,
  searchFilterActions,
  seasonFilterActions,
  producersFilterActions,
  typeFilterActions,
}
export { filterReducers }

const filterReducers = combineReducers({
  dateFilterReducer,
  genreFilterReducer,
  ratingFilterReducer,
  scoreFilterReducer,
  searchFilterReducer,
  seasonFilterReducer,
  producersFilterReducer,
  typeFilterReducer,
  orderByFilterReducer,
  sortFilterReducer,
  statusFilterReducer
});




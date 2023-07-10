import { sortTypes } from '@store/reducers/Filters/SortFilterSlice'

type sortDataTypes = { id: number; value: sortTypes }[]

export const sortData: sortDataTypes = [
  { id: 0, value: 'desc' },
  { id: 1, value: 'asc' },
]

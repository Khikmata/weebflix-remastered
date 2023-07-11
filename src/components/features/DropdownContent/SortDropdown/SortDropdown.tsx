import { TranslateSort } from '@utils/i18n'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { memo, useCallback, useMemo } from 'react'
import { sortFilterActions } from 'store/reducers/Filters/SortFilterSlice'
import styles from '../DropdownContentShared.styles.module.scss'
import { sortData } from './constants'

export const SortDropdown = memo(() => {
  const activeSort = useAppSelector(
    (state) => state.filter.sortFilters.sortType,
  )

  const dispatch = useAppDispatch()

  const handleSortChange = useCallback(
    (index: number) => {
      dispatch(sortFilterActions.setSortType(sortData[index].value))
    },
    [dispatch],
  )

  return (
    <>
      {sortData.map((sort) => (
        <li
          key={sort.id}
          onClick={() => handleSortChange(sort.id)}
          className={styles[sort.value === activeSort ? 'active' : '']}
        >
          {TranslateSort(sort.value)}
        </li>
      ))}
    </>
  )
})

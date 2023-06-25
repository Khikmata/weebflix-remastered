import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { sortFilterActions } from 'store/reducers/Filters/SortFilterSlice'
import styles from '../FilterDropdown.styles.module.scss'

export const SortDropdown = () => {
  const activeSort = useAppSelector((state) => state.filterReducer.sortFilters.sortType)

  const dispatch = useAppDispatch()

  const getSortDropdown = useMemo(() => {
    const sortData = [
      { id: 0, value: 'desc' },
      { id: 1, value: 'asc' },
    ]

    const handleSortChange = (index: number) => {
      dispatch(sortFilterActions.setSortType(sortData[index].value))
    }
    return sortData.map((sort) => (
      <li
        key={sort.id}
        onClick={() => handleSortChange(sort.id)}
        className={styles[sort.value === activeSort ? 'active' : '']}
      >
        {sort.value}
      </li>
    ))
  }, [activeSort, dispatch])

  return <>{getSortDropdown}</>
}

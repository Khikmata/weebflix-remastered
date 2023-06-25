import { useMemo } from 'react'

import { IDropdownItem } from '@store/types/DetailsTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { statusFilterActions } from 'store/reducers/Filters/StatusFilterSlice'
import styles from '../FilterDropdown.styles.module.scss'

export const StatusDropdown = () => {
  const activeStatus = useAppSelector(
    (state) => state.filterReducer.statusFilters.statusType,
  )

  const dispatch = useAppDispatch()

  const getSeasonsDropdown = useMemo(() => {
    const statusData = [
      { id: 0, value: 'airing' },
      { id: 1, value: 'complete' },
      { id: 2, value: 'upcoming' },
    ]

    const handleStatusChange = (status: IDropdownItem) => {
      if (status.value === activeStatus) {
        dispatch(statusFilterActions.setStatusType(null))
      } else {
        dispatch(statusFilterActions.setStatusType(statusData[status.id].value))
      }
    }
    return statusData.map((status) => (
      <li
        key={status.id}
        onClick={() => handleStatusChange(status)}
        className={styles[status.value === activeStatus ? 'active' : '']}
      >
        {status.value}
      </li>
    ))
  }, [activeStatus, dispatch])

  return <>{getSeasonsDropdown}</>
}

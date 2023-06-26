import { memo, useCallback, useMemo } from 'react'

import { IDropdownItem } from '@store/types/DetailsTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { statusFilterActions } from 'store/reducers/Filters/StatusFilterSlice'
import styles from '../DropdownContentShared.styles.module.scss'
import { statusData } from './constants'

export const StatusDropdown = memo(() => {
  const activeStatus = useAppSelector(
    (state) => state.filterReducer.statusFilters.statusType,
  )

  const dispatch = useAppDispatch()

  const handleStatusChange = useCallback(
    (status: IDropdownItem) => {
      if (status.value === activeStatus) {
        dispatch(statusFilterActions.setStatusType(null))
      } else {
        dispatch(statusFilterActions.setStatusType(statusData[status.id].value))
      }
    },
    [activeStatus, dispatch],
  )

  return useMemo(() => {
    return (
      <>
        {statusData.map((status) => (
          <li
            key={status.id}
            onClick={() => handleStatusChange(status)}
            className={styles[status.value === activeStatus ? 'active' : '']}
          >
            {status.value}
          </li>
        ))}
      </>
    )
  }, [activeStatus, handleStatusChange])
})

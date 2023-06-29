import { memo, useCallback } from 'react'

import { IDropdownItem } from '@store/types/DetailsTypes'
import { TranslateStatus } from '@utils/i18n'
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

  return (
    <>
      {statusData.map((status) => (
        <li
          key={status.id}
          onClick={() => handleStatusChange(status)}
          className={styles[status.value === activeStatus ? 'active' : '']}
        >
          {TranslateStatus(status.value)}
        </li>
      ))}
    </>
  )
})

import { memo, useCallback } from 'react'

import { UseTranslateOrder } from '@utils/i18n'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { orderByFilterActions } from 'store/reducers/Filters/OrderFilterSlice'
import styles from '../DropdownContentShared.styles.module.scss'
import { orderBy } from './constants'

export const OrderbyDropdown = memo(() => {
  const dispatch = useAppDispatch()
  const activeOrder = useAppSelector(
    (state) => state.filterReducer.orderFilters.orderBy,
  )

  const handleOrderChange = useCallback(
    (index: number) => {
      dispatch(orderByFilterActions.setOrderBy(orderBy[index]))
    },
    [dispatch],
  )

  return (
    <>
      {orderBy.map((order) => (
        <li
          key={order.id}
          onClick={() => handleOrderChange(order.id)}
          className={styles[activeOrder.id === order.id ? 'active' : '']}
        >
          {UseTranslateOrder(order.value)}
        </li>
      ))}
    </>
  )
})

import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { orderByFilterActions } from 'store/reducers/Filters/OrderFilterSlice'

import styles from '../FilterDropdown.styles.module.scss'
import { orderBy } from './constants'

export const OrderByDropdown = () => {
  const dispatch = useAppDispatch()
  const activeOrder = useAppSelector(
    (state) => state.filterReducer.orderFilters.orderBy,
  )
  const getOrderDropdown = useMemo(() => {
    const handleOrderChange = (index: number) => {
      dispatch(orderByFilterActions.setOrderBy(orderBy[index]))
    }
    return orderBy.map((order) => (
      <li
        key={order.id}
        onClick={() => handleOrderChange(order.id)}
        className={styles[activeOrder.id === order.id ? 'active' : '']}
      >
        {order.value}
      </li>
    ))
  }, [activeOrder, dispatch])

  return <>{getOrderDropdown}</>
}

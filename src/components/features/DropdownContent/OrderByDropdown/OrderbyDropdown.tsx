import { memo, useCallback } from 'react'

import { TranslateOrder } from '@utils/i18n'
import { motion } from 'framer-motion'
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
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <>
      {orderBy.map((order) => (
        <motion.li
          variants={variants}
          key={order.id}
          onClick={() => handleOrderChange(order.id)}
          className={styles[activeOrder.id === order.id ? 'active' : '']}
        >
          {TranslateOrder(order.value)}
        </motion.li>
      ))}
    </>
  )
})

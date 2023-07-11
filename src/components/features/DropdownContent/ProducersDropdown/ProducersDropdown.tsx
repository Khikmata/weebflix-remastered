import { memo, useCallback, useMemo } from 'react'

import styles from '../DropdownContentShared.styles.module.scss'

import { IProducers } from '@store/types/FetchTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { producersFilterActions } from 'store/reducers/Filters'

export const ProducersDropdown = memo(() => {
  const producerData = useAppSelector(
    (state) => state.dropdownData.producersData,
  )
  const activeProducer = useAppSelector((state) => state.filter.producerFilters)
  const dispatch = useAppDispatch()

  const handleProducerChange = useCallback(
    (producer: IProducers) => {
      if (producer.mal_id === activeProducer.producersQuery) {
        dispatch(producersFilterActions.removeProducer())
      } else {
        dispatch(producersFilterActions.setProducer(producer))
      }
    },
    [dispatch, activeProducer],
  )
  return useMemo(() => {
    return (
      <>
        {producerData.map((producer: IProducers) => (
          <li
            key={producer.mal_id}
            onClick={() => handleProducerChange(producer)}
            className={
              styles[
                activeProducer.producersQuery === producer.mal_id
                  ? 'active'
                  : ''
              ]
            }
          >
            {producer.titles[0].title}
          </li>
        ))}
      </>
    )
  }, [activeProducer, producerData, handleProducerChange])
})

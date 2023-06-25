import { useMemo } from 'react'

import styles from '../FilterDropdown.styles.module.scss'

import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { producersFilterActions } from 'store/reducers/Filters'
import { IProducers } from 'types/FetchTypes'

export const ProducersDropdown = () => {
  const producerData = useAppSelector(
    (state) => state.dropdownData.producersData,
  )
  const activeProducer = useAppSelector(
    (state) => state.filterReducer.producerFilters,
  )
  const dispatch = useAppDispatch()

  const getSeasonsDropdown = useMemo(() => {
    const handleProducerChange = (producer: IProducers) => {
      if (producer.mal_id === activeProducer.producersQuery) {
        dispatch(producersFilterActions.removeProducer())
      } else {
        dispatch(producersFilterActions.setProducer(producer))
      }
    }
    return producerData.map((producer: IProducers) => (
      <li
        key={producer.mal_id}
        onClick={() => handleProducerChange(producer)}
        className={
          styles[
            activeProducer.producersQuery === producer.mal_id ? 'active' : ''
          ]
        }
      >
        {producer.titles[0].title}
      </li>
    ))
  }, [activeProducer, producerData, dispatch])

  return <>{getSeasonsDropdown}</>
}

import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { DropDownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import styles from '../FilterDropdown.styles.module.scss'

import { useAppSelector } from '../../../../../hooks/redux'
import { producersFilterActions } from '../../../../../store/reducers/Filters'

export const ProducersDropdown = () => {
  const [selectedProducerIndex, setSelectedProducerIndex] = useState<number | null>(null)

  const producerData = useAppSelector((state) => state.dropDownData.producersData)
  const dispatch = useDispatch()

  const getSeasonsDropdown = useMemo(() => {
    const handleProducerChange = (index: number, selectedProducer: number | null) => {
      if (index === selectedProducer) {
        dispatch(producersFilterActions.removeProducer(producerData[index].titles[0].title))
        setSelectedProducerIndex(null)
      } else {
        dispatch(producersFilterActions.setProducer(producerData[index]))
        setSelectedProducerIndex(index)
      }
    }
    return producerData.map((producer, index) => (
      <li
        key={index}
        onClick={() => handleProducerChange(index, selectedProducerIndex)}
        className={styles[selectedProducerIndex === index ? 'active' : '']}
      >
        {translateDropdownContent(producer.titles[0].title, DropDownTypeEnum.PRODUCER)}
      </li>
    ))
  }, [selectedProducerIndex, producerData])

  return <>{getSeasonsDropdown}</>
}

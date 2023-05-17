import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { DropDownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import styles from '../FilterDropdown.styles.module.scss'

import { useEffect } from 'react'
import { useAppSelector } from '../../../../../hooks/redux'
import { producersFilterActions } from '../../../../../store/reducers/Filters'
import { IProducers } from '../../../../../types/FetchTypes'


export const ProducersDropdown = () => {
  const [selectedProducerIndex, setSelectedProducerIndex] = useState<number | null>(
    () => parseInt(localStorage.getItem('selectedProducerIndex') || '') || null
  );

  const producerData = useAppSelector((state) => state.dropDownData.producersData)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('selectedProducerIndex', selectedProducerIndex?.toString() || '');
  }, [selectedProducerIndex]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('selectedProducerIndex');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const getSeasonsDropdown = useMemo(() => {
    const handleProducerChange = (index: number, selectedProducer: number | null) => {
      if (index === selectedProducer) {
        dispatch(producersFilterActions.removeProducer())
        setSelectedProducerIndex(null)
      } else {
        dispatch(producersFilterActions.setProducer(producerData[index]))
        setSelectedProducerIndex(index)
      }
    }
    return producerData.map((producer: IProducers, index) => (
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

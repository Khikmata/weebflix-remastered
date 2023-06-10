import { useMemo, useState } from 'react';


import styles from '../FilterDropdown.styles.module.scss';


import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
import { producersFilterActions } from 'store/reducers/Filters';
import { IProducers } from 'types/FetchTypes';
import { translateDropdownContent } from '../../TranslateDropdown';
import { DropdownTypeEnum } from 'utils/DataTypes/AnimeData';


export const ProducersDropdown = () => {
  const [selectedProducerIndex, setSelectedProducerIndex] = useState<number | null>(
    () => parseInt(localStorage.getItem('selectedProducerIndex') || '') || null
  );

  const producerData = useAppSelector((state) => state.dropdownData.producersData)
  const dispatch = useAppDispatch()




  useEffect(() => {
    window.sessionStorage.getItem('selectedProducerIndex');
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('selectedProducerIndex', selectedProducerIndex?.toString() || '');
  }, [selectedProducerIndex]);


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
        {translateDropdownContent(producer.titles[0].title, DropdownTypeEnum.PRODUCER)}
      </li>
    ))
  }, [selectedProducerIndex, producerData])

  return <>{getSeasonsDropdown}</>
}

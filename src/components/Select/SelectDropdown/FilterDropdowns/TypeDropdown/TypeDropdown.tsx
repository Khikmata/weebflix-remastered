import { useMemo, useState } from 'react'

import { translateDropdownContent } from '../../TranslateDropdown'

import { useAppDispatch } from '../../../../../hooks/redux'
import { typeFilterActions } from '../../../../../store/reducers/Filters'
import { AnimeTypesData, DropdownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import styles from '../FilterDropdown.styles.module.scss'
export const TypeDropdown = () => {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  const getTypeDropdown = useMemo(() => {
    const handleTypeChange = (index: number) => {
      if (index === selectedTypeIndex) {
        dispatch(typeFilterActions.removeType())
        setSelectedTypeIndex(null)
      } else {
        dispatch(typeFilterActions.setType(AnimeTypesData[index]))
        setSelectedTypeIndex(index)
      }
    }
    return AnimeTypesData.map((type, index) => (
      <li
        key={index}
        onClick={() => handleTypeChange(index)}
        className={styles[selectedTypeIndex === index ? 'active' : '']}
      >
        {translateDropdownContent(type, DropdownTypeEnum.TYPES)}
      </li>
    ))
  }, [selectedTypeIndex, AnimeTypesData, dispatch])

  return <>{getTypeDropdown}</>
}

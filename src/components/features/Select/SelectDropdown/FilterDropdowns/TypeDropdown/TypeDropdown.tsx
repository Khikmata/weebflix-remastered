import { useMemo } from 'react'

import { IDropdownItem } from '@store/types/DetailsTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { typeFilterActions } from 'store/reducers/Filters'
import { AnimeTypesData } from 'utils/DataTypes/AnimeData'
import styles from '../FilterDropdown.styles.module.scss'

export const TypeDropdown = () => {
  const activeType = useAppSelector((state) => state.filterReducer.typeFilters.typeQuery)

  const dispatch = useAppDispatch()

  const getTypeDropdown = useMemo(() => {
    const handleTypeChange = (type: IDropdownItem) => {
      if (type.value === activeType) {
        dispatch(typeFilterActions.removeType())
      } else {
        dispatch(typeFilterActions.setType(AnimeTypesData[type.id].value))
      }
    }
    return AnimeTypesData.map((type) => (
      <li
        key={type.id}
        onClick={() => handleTypeChange(type)}
        className={styles[activeType === type.value ? 'active' : '']}
      >
        {type.value}
      </li>
    ))
  }, [activeType, dispatch])

  return <>{getTypeDropdown}</>
}

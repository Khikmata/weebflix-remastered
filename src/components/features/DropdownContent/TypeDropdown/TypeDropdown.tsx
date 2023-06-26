import { memo, useCallback } from 'react'

import { IDropdownItem } from '@store/types/DetailsTypes'
import { AnimeTypesData } from '@utils/constants/AnimeData'
import { UseTranslateType } from '@utils/i18n/UseTranslateType'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { typeFilterActions } from 'store/reducers/Filters'
import styles from '../DropdownContentShared.styles.module.scss'

export const TypeDropdown = memo(() => {
  const activeType = useAppSelector(
    (state) => state.filterReducer.typeFilters.typeQuery,
  )

  const dispatch = useAppDispatch()

  const handleTypeChange = useCallback(
    (type: IDropdownItem) => {
      if (type.value === activeType) {
        dispatch(typeFilterActions.removeType())
      } else {
        dispatch(typeFilterActions.setType(AnimeTypesData[type.id].value))
      }
    },
    [activeType, dispatch],
  )

  return (
    <>
      {AnimeTypesData.map((type) => (
        <li
          key={type.id}
          onClick={() => handleTypeChange(type)}
          className={styles[activeType === type.value ? 'active' : '']}
        >
          {UseTranslateType({ type: type.value })}
        </li>
      ))}
    </>
  )
})

import { useMemo, useState } from 'react'
import { DropdownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import { useAppDispatch } from '../../../../../hooks/redux'
import { sortFilterActions } from '../../../../../store/reducers/Filters/SortFilterSlice'
import styles from '../FilterDropdown.styles.module.scss'
export const SortDropdown = () => {
  const [selectedSortIndex, setSelectedSortIndex] = useState<number>(0)

  const sortData = ['desc', 'asc']

  const dispatch = useAppDispatch()

  const getSortDropdown = useMemo(() => {
    const handleSortChange = (index: number) => {
      dispatch(sortFilterActions.setSortType(sortData[index]))
      setSelectedSortIndex(index)
    }
    return sortData.map((sort, index) => (
      <li
        key={index}
        onClick={() => handleSortChange(index)}
        className={styles[selectedSortIndex === index ? 'active' : '']}
      >
        {translateDropdownContent(sort, DropdownTypeEnum.SORT)}
      </li>
    ))
  }, [selectedSortIndex, dispatch])

  return <>{getSortDropdown}</>
}

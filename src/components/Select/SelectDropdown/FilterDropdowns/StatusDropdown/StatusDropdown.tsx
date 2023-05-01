import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { statusFilterActions } from '../../../../../store/reducers/Filters/StatusFilterSlice'
import { DropDownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import styles from '../FilterDropdown.styles.module.scss'

export const StatusDropdown = () => {
  const [selectedStatusIndex, setSelectedStatusIndex] = useState<number | null>(null)

  const statusData = ['airing', 'complete', 'upcoming']

  const dispatch = useDispatch()

  const getSeasonsDropdown = useMemo(() => {
    const handleStatusChange = (index: number, selectedStatus: number | null) => {
      if (index === selectedStatus) {
        dispatch(statusFilterActions.setStatusType(null))
        setSelectedStatusIndex(null)
      } else {
        dispatch(statusFilterActions.setStatusType(statusData[index]))
        setSelectedStatusIndex(index)
      }
    }
    return statusData.map((status, index) => (
      <li
        key={index}
        onClick={() => handleStatusChange(index, selectedStatusIndex)}
        className={styles[selectedStatusIndex === index ? 'active' : '']}
      >
        {translateDropdownContent(status, DropDownTypeEnum.STATUS)}
      </li>
    ))
  }, [selectedStatusIndex, statusData, dispatch])

  return <>{getSeasonsDropdown}</>
}

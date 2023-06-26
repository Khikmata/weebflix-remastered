import React, { useCallback, useState } from 'react'

import Dropdown from 'assets/icons/DropdownIcon.svg'
import styles from './SelectComponent.styles.module.scss'

import { DropdownTypeEnum } from '@utils/constants/AnimeData'
import { useDisplayHandler } from 'hooks/useDisplayHandler'

interface IDropdownData {
  id: number
  title: string
  tooltip: string
  type: DropdownTypeEnum
  element?: React.MemoExoticComponent<React.FC>
}

interface SelectComponentProps {
  dropdownData: IDropdownData
}

export const Select = ({ dropdownData }: SelectComponentProps) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const { element: Element, title, tooltip, type } = dropdownData

  //tooltips for inputs
  const displayedValue = useDisplayHandler({ dropdownType: type, tooltip })

  const handleDropdown = useCallback(() => {
    setOpenDropdown((prevState) => !prevState)
  }, [])

  return (
    <div className={styles['selectComponent']}>
      <p>{title}</p>
      <button
        onClick={handleDropdown}
        className={styles['selectComponent-container']}
      >
        <p>{displayedValue}</p>
        <img
          src={Dropdown}
          width={12}
          alt="Выпадающее меню"
          className={styles[openDropdown ? 'dropdown-icon__active' : '']}
        />
      </button>
      <div
        className={[
          styles['selectComponent-dropdown'],
          styles[openDropdown ? 'active' : ''],
        ].join(' ')}
      >
        <ul className={styles['dropdown-list']}>{Element && <Element />}</ul>
      </div>
    </div>
  )
}

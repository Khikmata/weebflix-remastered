import React, { memo, useCallback, useState } from 'react'

import Dropdown from 'assets/icons/DropdownIcon.svg'
import styles from './SelectComponent.styles.module.scss'

import { DropdownTypeEnum } from '@utils/constants/AnimeData'
import { useAnimate } from 'framer-motion'
import { useDisplayHandler } from '../../../hooks/useDisplayHandler'

interface IDropdownData {
  id: number
  title: string
  type: DropdownTypeEnum
  element?: React.MemoExoticComponent<React.FC>
}

interface SelectComponentProps {
  dropdownData: IDropdownData
}

export const Select = memo(({ dropdownData }: SelectComponentProps) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [scope, animate] = useAnimate()
  const { element: Element, title, type } = dropdownData

  //tooltips for inputs
  const displayedValue = useDisplayHandler(type)

  const handleDropdown = useCallback(() => {
    setOpenDropdown((prevState) => !prevState)
  }, [])

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

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
})

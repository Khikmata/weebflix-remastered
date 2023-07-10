import React, { useRef } from 'react'
import styles from './Dropdown.styles.module.scss'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  open: boolean
  onSelect: (value: string) => void
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  open,
  onSelect,
}) => {
  const dropdownRef = useRef(null)

  //useOutsideClick(dropdownRef, onselect, open)

  const handleOptionClick = (option: DropdownOption) => {
    onSelect(option.value)
  }

  if (!open) {
    return null
  }

  return (
    <ul ref={dropdownRef} className={styles['dropdown-options']}>
      {options.map((option) => (
        <li key={option.value} onClick={() => handleOptionClick(option)}>
          {option.label}
        </li>
      ))}
    </ul>
  )
}

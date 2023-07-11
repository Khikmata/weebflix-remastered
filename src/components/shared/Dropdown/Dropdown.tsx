import React, { memo, useRef } from 'react'
import styles from './Dropdown.styles.module.scss'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  open: boolean
  onSelect: (value: string) => void
  direction?: 'vertical' | 'horizontal'
}

export const Dropdown: React.FC<DropdownProps> = memo(
  ({ options, open, onSelect, direction }) => {
    const dropdownRef = useRef(null)

    const handleOptionClick = (option: DropdownOption) => {
      console.log('click')
      onSelect(option.value)
    }

    if (!open) {
      return null
    }

    return (
      <ul
        ref={dropdownRef}
        className={styles['dropdown-options']}
        style={{ flexDirection: direction === 'vertical' ? 'column' : 'row' }}
      >
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionClick(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    )
  },
)

import React from 'react'

import { IOption } from '@store/types/DetailsTypes'
import styles from './OptionsBlock.styles.module.scss'

interface OptionsBlockProps {
  options: IOption[]
  handleOptions: (index: number) => void
  activeOption: number
}

export const OptionsBlock: React.FC<OptionsBlockProps> = ({
  options,
  handleOptions,
  activeOption,
}) => {
  return (
    <div className={styles['options']}>
      <div className={styles['options__content']}>
        <ul>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptions(option.id)}
              className={styles[`${activeOption === option.id && 'active'}`]}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

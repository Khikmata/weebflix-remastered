import React, { memo } from 'react'
import styles from './Pagination.styles.module.scss'

import { ReactComponent as NextArrow } from '@assets/icons/NextArrowIcon.svg'
import { ReactComponent as PrevArrow } from '@assets/icons/PrevArrowIcon.svg'

interface PaginationProps {
  handleNextPage: () => void
  handlePrevPage: () => void
  hasNextPage?: boolean
  pages: number
}

export const Pagination: React.FC<PaginationProps> = memo(
  ({ handleNextPage, handlePrevPage, hasNextPage, pages }) => {
    return (
      <div className={styles['pagination']}>
        <button
          className={[
            styles['pagination-button'],
            styles[pages === 1 ? 'disabled' : ''],
          ].join(' ')}
          onClick={handlePrevPage}
        >
          <PrevArrow />
        </button>
        <button
          className={[
            styles['pagination-button'],
            styles[hasNextPage === false ? 'disabled' : ''],
          ].join(' ')}
          onClick={handleNextPage}
        >
          <NextArrow />
        </button>
      </div>
    )
  },
)

import { ChangeGridLayout } from '@components/features/ChangeGridLayout/ChangeGridLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AnimeGridWrapper.styles.module.scss'

interface AnimeGridWrapperProps {
  title: string
  children: React.ReactNode
}

export const AnimeGridWrapper = ({
  children,
  title,
}: AnimeGridWrapperProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles['animegrid']}>
      <div className={styles['animegrid-container']}>
        <div className={styles['animegrid-header']}>
          <h2>{t(title)}</h2>
          <ChangeGridLayout />
        </div>
        {children}
      </div>
    </div>
  )
}

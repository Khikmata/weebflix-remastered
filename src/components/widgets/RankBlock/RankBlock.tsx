import { useTranslation } from 'react-i18next'
import { IDetails } from 'types/FetchTypes'
import styles from './RankBlock.styles.module.scss'

interface RankBlockProps {
  details: IDetails
}

export const RankBlock: React.FC<RankBlockProps> = ({ details }) => {
  const { t } = useTranslation()

  return (
    <div className={styles['anime-info-rank']}>
      <div className={styles['rank-stats']}>
        <div className={styles['rank-avg']}>
          <p>{t('animepage_info_score')}</p>
          <span>{details?.score || '?'}</span>
        </div>
        <div className={styles['rank-place']}>
          <p>{t('animepage_info_place')}</p>
          <span>{details?.rank === null ? '?' : '#' + details?.rank}</span>
        </div>
        <div className={styles['rank-popularity']}>
          <p>{t('animepage_info_popularity')}</p>
          <span>#{details?.popularity || '?'}</span>
        </div>
        <div className={styles['rank-reviews']}>
          <p>{t('animepage_info_scoredby')}</p>
          <span>{details?.scored_by || '?'}</span>
        </div>
      </div>
    </div>
  )
}

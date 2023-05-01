import { IDetails } from '../../../types/FetchTypes'
import styles from './RankBlock.styles.module.scss'

interface RankBlockProps {
    details: IDetails
}

export const RankBlock: React.FC<RankBlockProps> = ({ details }) => {
    return (
        <div className={styles['anime-info-rank']}>
            <div className={styles['rank-avg']}>
                <p>Рейтинг</p>
                <span>{details?.score || '?'}</span>
                <small>Всего оценок: {details.scored_by}</small>
            </div>
            <div className={styles['rank-stats']}>
                <div className={styles['rank-place']}>
                    <p>Место</p>
                    <span>
                        {details?.rank === null ? '?' : '#' + details?.rank}
                    </span>
                </div>
                <div className={styles['rank-popularity']}>
                    <p>Популярность</p>
                    <span>#{details?.popularity || '?'}</span>
                </div>
                <div className={styles['rank-reviews']}>
                    <p>Оценок</p>
                    <span>{details?.scored_by || '?'}</span>
                </div>
            </div>
        </div>
    )
}

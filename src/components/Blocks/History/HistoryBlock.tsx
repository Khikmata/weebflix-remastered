import star from '../../../assets/icons/star.svg'
import styles from './HistoryBlock.styles.module.scss'

export const HistoryBlock = () => {
  return (
    <div className={styles['history']}>
      <div className={styles['history__content']}>
        <div className={styles['history__content__top']}>
          <p>Последнее просмотренное:</p>
          <img loading="lazy" src={star} alt={'rate it!'} />
        </div>
        <div className={styles['history__content__middle']}>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/M/MV5BYzJmZjZkMjQtZjJmZC00M2JkLTg5MzktN2FkOTllNTc5MmMzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg"
            alt="anime"
          />
          <div className={styles['content__info']}>
            <div className={styles['content__info__top']}>
              <p>Erased</p>
            </div>
            <div className={styles['content__info__middle']}>
              <p className={styles['info__watchstate']}>Просмотрено</p>
              <p className={styles['info__episodes']}>24 эпизодов</p>
            </div>
            <div className={styles['content__info__bottom']}>
              <ul className={styles['info__genres']}>
                <li>Триллер</li>
                <li>Драма</li>
              </ul>
              <p className={styles['info__rating']}>
                Оценка: <span>10</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

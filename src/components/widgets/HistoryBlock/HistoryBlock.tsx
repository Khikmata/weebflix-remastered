import starIcon from '@assets/icons/StarIcon.svg'
import { genreFilterActions } from '@store/reducers/Filters'
import { getAnimeDetails } from '@store/services/getAnimeDetails'
import { IGenres } from '@store/types/DetailsTypes'
import { useAppDispatch } from 'hooks/redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styles from './HistoryBlock.styles.module.scss'

export const HistoryBlock = () => {
  const {
    data: details,
    error: detailsErrors,
    isLoading: detailsLoading,
  } = getAnimeDetails.useGetAnimeDetailsQuery('31043')

  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNavigateToSearch = (
    e: React.MouseEvent<HTMLElement>,
    genre: IGenres,
  ) => {
    e.stopPropagation()
    navigate('/search')
    dispatch(genreFilterActions.setGenre(genre))
  }

  const handleNavigateToPage = (id: number) => {
    navigate(`/anime/${id}`)
  }

  return (
    <div className={styles['history']}>
      <div
        className={styles['history__content']}
        onClick={() => handleNavigateToPage(31043)}
      >
        <div className={styles['history__content__top']}>
          <p>{t('historyBlock_title')}</p>
          <img loading="lazy" src={starIcon} alt={'rate it!'} />
        </div>
        <div className={styles['history__content__middle']}>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/M/MV5BYzJmZjZkMjQtZjJmZC00M2JkLTg5MzktN2FkOTllNTc5MmMzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.webp"
            alt="anime"
          />
          <div className={styles['content__info']}>
            <div className={styles['content__info__top']}>
              <p>Erased</p>
            </div>
            <div className={styles['content__info__middle']}>
              <p className={styles['info__watchstate']}>
                {t('user_status_completed')}
              </p>
              <p className={styles['info__episodes']}>
                24 {t('historyBlock_episodes')}
              </p>
            </div>
            <div className={styles['content__info__bottom']}>
              <ul className={styles['info__genres']}>
                {details &&
                  details.genres
                    .filter((_, index) => index < 2)
                    .map((genre: IGenres) => (
                      <li
                        onClick={(e) => handleNavigateToSearch(e, genre)}
                        key={genre.mal_id}
                      >
                        <p>{genre.name}</p>
                      </li>
                    ))}
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

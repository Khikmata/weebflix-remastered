import { useNavigate } from 'react-router-dom'
import star from '../../../assets/icons/star.svg'
import { useAppDispatch } from '../../../hooks/redux'
import { genreFilterActions } from '../../../store/reducers/Filters'
import { AnimeApi } from '../../../store/services/getAnime'
import { IGenres } from '../../../types/DetailsTypes'
import { TranslateGenresToRussian } from '../../../utils/Translation/TranslateGenres'
import { Button } from '../../UI/Button'
import styles from './HistoryBlock.styles.module.scss'

export const HistoryBlock = () => {


  const { data: details, error: detailsErrors, isLoading: detailsLoading } = AnimeApi.useGetAnimeDetailsQuery('31043')

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigateToSearch = (e: React.MouseEvent<HTMLElement>, genre: IGenres, index: number) => {
    e.stopPropagation();
    navigate('/search')
    dispatch(genreFilterActions.setGenre(genre))
  }

  const handleNavigateToPage = (id: number) => {
    navigate(`/anime/${id}`)
  }


  return (
    <div className={styles['history']}>
      <div className={styles['history__content']} onClick={() => handleNavigateToPage(31043)}>
        <div className={styles['history__content__top']}>
          <p>Последнее просмотренное:</p>
          <img loading="lazy" src={star} alt={'rate it!'} />
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
              <p className={styles['info__watchstate']}>Просмотрено</p>
              <p className={styles['info__episodes']}>24 эпизодов</p>
            </div>
            <div className={styles['content__info__bottom']}>
              <ul className={styles['info__genres']}>
                {details && details.genres.filter((details, id) => id < 2).map((genre: IGenres, index) => (
                  <li onClick={(e) => handleNavigateToSearch(e, genre, index)} key={index}>
                    <p>
                      {TranslateGenresToRussian(genre.name)}
                    </p>
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

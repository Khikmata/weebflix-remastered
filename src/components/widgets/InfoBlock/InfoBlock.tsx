import { useNavigate } from 'react-router-dom'

import { Button } from '@components/shared'
import { genreFilterActions, typeFilterActions } from '@store/reducers/Filters'
import { statusFilterActions } from '@store/reducers/Filters/StatusFilterSlice'
import { useAppDispatch } from 'hooks/redux'
import { useTranslation } from 'react-i18next'
import { IGenres } from 'types/DetailsTypes'
import { IDetails } from 'types/FetchTypes'
import styles from './InfoBlock.styles.module.scss'
import { transformStatusToQuery } from './helpers/transformStringToQuery'

interface InfoBlockProps {
  details: IDetails
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ details }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleType = (item: string) => {
    navigate('/search')
    dispatch(typeFilterActions.setType(item))
  }
  const handleStatus = (item: string) => {
    navigate('/search')
    dispatch(statusFilterActions.setStatusType(transformStatusToQuery(item)))
  }
  const handleGenres = (item: IGenres) => {
    navigate('/search')
    dispatch(genreFilterActions.setGenre(item))
  }

  return (
    <>
      <div className={styles['infoBlock']}>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_type') + ' '}
          <Button
            onClick={() => handleType(details.type)}
            contentPadding={'3'}
            outlined
          >
            {details.type}
          </Button>
        </p>
        <p>
          {t('animepage_info_episodes')} {details.episodes || 0}
        </p>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_status')}
          <Button
            onClick={() => handleStatus(details.status)}
            outlined
            contentPadding={'3'}
          >
            {details.status}
          </Button>
        </p>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_genres')}
          {details.genres.map((genre: IGenres, index) => (
            <Button
              onClick={() => handleGenres(genre)}
              key={index}
              color="secondary"
              contentPadding={'3'}
            >
              {genre.name}
            </Button>
          ))}
        </p>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_producers')}
          {details.studios.map((studio: any, index) => (
            <Button key={index} outlined contentPadding={'3'}>
              {studio.name}
            </Button>
          ))}
        </p>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_rating')}
          <Button outlined contentPadding={'3'}>
            {details.rating}
          </Button>
        </p>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_duration')}
          <Button outlined contentPadding={'3'}>
            {details.duration}
          </Button>
        </p>
        <p className={styles['infoBlock-outlined']}>
          {t('animepage_info_release')}
          <Button outlined contentPadding={'3'}>
            {details.season} {details.year}
          </Button>
        </p>
      </div>
    </>
  )
}

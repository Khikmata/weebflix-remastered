import { useNavigate } from 'react-router-dom'

import { Button } from '@components/shared'
import {
  genreFilterActions,
  producersFilterActions,
  ratingFilterActions,
  typeFilterActions,
} from '@store/reducers/Filters'
import { statusFilterActions } from '@store/reducers/Filters/StatusFilterSlice'
import { IDropdownItem, IGenres } from '@store/types/DetailsTypes'
import { IDetails, IProducers } from '@store/types/FetchTypes'
import { TranslateRating, TranslateStatus, TranslateType } from '@utils/i18n'
import { useAppDispatch } from 'hooks/redux'
import { useTranslation } from 'react-i18next'
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
  const handleProducers = (item: IProducers) => {
    navigate('/search')
    dispatch(producersFilterActions.setProducer(item))
  }
  const handleRating = (item: IDropdownItem) => {
    navigate('/search')
    dispatch(ratingFilterActions.setRating(item))
  }
  console.log(details)
  const handleToSearch = () => {}

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
            {TranslateType(details.type)}
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
            {TranslateStatus(details.status)}
          </Button>
        </p>
        <p className={styles['infoBlock-outlined__genres']}>
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
            {TranslateRating(details.rating)}
          </Button>
        </p>
        <p>
          {t('animepage_info_duration')}
          <span> {details.duration}</span>
        </p>
        <p>
          {t('animepage_info_release')}
          <span>{details.aired.string}</span>
        </p>
      </div>
    </>
  )
}

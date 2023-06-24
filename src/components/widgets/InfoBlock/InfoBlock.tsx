import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@components/shared'
import { genreFilterActions, typeFilterActions } from '@store/reducers/Filters'
import { useAppDispatch } from 'hooks/redux'
import { IGenres } from 'types/DetailsTypes'
import { IDetails } from 'types/FetchTypes'
import styles from './InfoBlock.styles.module.scss'

interface InfoBlockProps {
  details: IDetails
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ details }) => {
  const [openDescription, setOpenDescirpiton] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleType = (item: string) => {
    navigate('/search')
    dispatch(typeFilterActions.setType(item))
  }
  const handleGenres = (item: IGenres) => {
    navigate('/search')
    dispatch(genreFilterActions.setGenre(item))
  }

  return (
    <>
      <div className={styles['infoBlock']}>
        <p className={styles['infoBlock-type']}>
          Тип:{' '}
          <Button onClick={() => handleType(details.type)} contentPadding={'3'} outlined>
            {details.type}
          </Button>
        </p>
        <p>Эпизоды: {details.episodes || 0}</p>
        <p>Статус: {details.status}</p>
        <p className={styles['infoBlock-genres']}>
          Жанры:{' '}
          {details.genres.map((genre: IGenres, index) => (
            <Button onClick={() => handleGenres(genre)} key={index} color="secondary" contentPadding={'3'}>
              {genre.name}
            </Button>
          ))}
        </p>
        <p className={styles['infoBlock-studio']}>
          Студия:{' '}
          {details.studios.map((studio: any, index) => (
            <Button key={index} outlined contentPadding={'3'}>
              {studio.name}
            </Button>
          ))}
        </p>
        <p>Рейтинг: {details.rating}</p>
        <p>Длительность: {details.duration}</p>
        <p>
          Выпуск: {details.season} {details.year}{' '}
        </p>
      </div>
      <div
        onClick={() => setOpenDescirpiton((prevstate) => !prevstate)}
        className={[styles['description'], styles[openDescription ? 'active' : '']].join(' ')}
      >
        <strong>Описание:</strong>
        <br />
        <p>{details.synopsis}</p>
      </div>
    </>
  )
}

import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { IData } from '@store/types/FetchTypes'
import { ColorRating } from 'utils/Coloring/ColorRating'
import { ColorStatus } from 'utils/Coloring/ColorStatus'

import { useAppSelector } from 'hooks/redux'
import styles from './AnimeCard.styles.module.scss'
import { CatalogueLayoutType } from '@store/reducers/Catalogue/types'

interface CatalogueCardProps {
  item: IData
  activeLayout?: CatalogueLayoutType
}

export const AnimeCard: React.FC<CatalogueCardProps> = ({
  item,
  activeLayout,
}) => {
  const colorStatus = useMemo(() => ColorStatus(item.status), [item.status])

  const renderCardGrid = useMemo(() => {
    return (
      <div key={item.mal_id} className={styles['anime-card']}>
        <Link
          to={`/anime/${item.mal_id}`}
          className={styles['anime-card-image']}
        >
          <img
            loading="lazy"
            decoding="async"
            src={item.images.webp.large_image_url}
            alt={item.title_english + 'poster'}
          />
          <div
            className={styles['anime-card-image__rating']}
            style={{ color: ColorRating(item.score) }}
          >
            {item.score || '?'}
          </div>
        </Link>
        {/* TODO: Показывать превью след страницы при наведении на карточку
         <div className={styles['anime-card__preview']}>
          <p>{item.title}</p>
          <p>Статус: {item.status}</p>
          <span>{item.background}</span>
          <p>Тип: {item.type}</p>
        </div> */}
        <div className={styles['anime-card-info']}>
          <div
            className={styles['anime-card-info__title']}
            title={item.title_english ? item.title_english : item.title}
          >
            {item.title_english ? item.title_english : item.title}
          </div>
        </div>
      </div>
    )
  }, [item])

  const renderCardList = useMemo(() => {
    return (
      <div key={item.mal_id} className={styles['anime-card__list']}>
        <Link
          to={`/anime/${item.mal_id}`}
          className={styles['anime-card-image__list']}
        >
          <img
            loading="lazy"
            decoding="async"
            src={item.images.webp.large_image_url}
            alt={item.title_english + 'poster'}
          />
          <div
            className={styles['anime-card-image__rating']}
            style={{ color: ColorRating(item.score) }}
          >
            {item.score || '?'}
          </div>
        </Link>
        <div className={styles['anime-card-info__list']}>
          <div
            className={styles['anime-card-info__title']}
            title={item.title_english ? item.title_english : item.title}
          >
            {item.title_english ? item.title_english : item.title}
          </div>
          <div className={styles['anime-card-info__more']}>
            <span
              style={{
                color: colorStatus,
              }}
            >
              {item.status}
            </span>
            <span>{item.year && ` / ${item.year}`}</span>
            <span>{item.season && ` / ${item.season}`}</span>
          </div>
          <div className={styles['anime-card-info__episodes']}>
            Эпизодов: {item.episodes}
          </div>
          <div className={styles['anime-card-info__description']}>
            Описание: {item.synopsis}
          </div>
        </div>
      </div>
    )
  }, [item, colorStatus])
  return (
    <>
      {(activeLayout === 'grid' || !activeLayout) && renderCardGrid}
      {activeLayout === 'list' && renderCardList}
    </>
  )
}

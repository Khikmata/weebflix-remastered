import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IData } from '../../../types/FetchTypes'
import { ColorRating } from '../../../utils/Coloring/ColorRating'
import { TranslateSeasonToRussian } from '../../../utils/Translation/TranslateRelease'
import { TranslateStatusToRussian } from '../../../utils/Translation/TranslateStatus'
import styles from './AnimeCard.styles.module.scss'
import { ColorStatus } from '../../../utils/Coloring/ColorStatus'

interface CatalogueCardProps {
  index: number;
  item: IData;
  mode?: number;
}





export const AnimeCard: React.FC<CatalogueCardProps> = ({ index, item, mode }) => {

  !mode && (mode = 0)
  const renderCardGrid = useMemo(() => {
    return (
      <div key={index} className={styles['anime-card']}>
        <Link to={`/anime/${item.mal_id}`} className={styles['anime-card-image']}>
          <img
            loading="lazy"
            decoding='async'
            src={item.images.webp.large_image_url}
            alt={item.title_english + 'poster'}
          />
          <div className={styles['anime-card-image__rating']} style={{ color: ColorRating(item.score) }}>
            {item.score || '?'}
          </div>
        </Link>
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
  }, [index, item])

  const renderCardList = useMemo(() => {
    return (
      <div key={index} className={styles['anime-card__list']}>
        <Link to={`/anime/${item.mal_id}`} className={styles['anime-card-image__list']}>
          <img
            loading="lazy"
            decoding='async'
            src={item.images.webp.large_image_url}
            alt={item.title_english + 'poster'}
          />
          <div className={styles['anime-card-image__rating']} style={{ color: ColorRating(item.score) }}>
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
          <div className={styles['anime-card-info__more']} style={{ color: ColorStatus(item.status) }}>
            {(TranslateStatusToRussian(item.status))} {item.year && `/ ${item.year}`} {item.season && `/ ${TranslateSeasonToRussian(item.season)}`}
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
  }, [index, item])
  return <> {mode === 0 ? renderCardGrid : renderCardList} </>;
}

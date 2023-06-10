import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import styles from './AnimeCard.styles.module.scss';
import { IData } from 'types/FetchTypes';
import { ColorRating } from 'utils/Coloring/ColorRating';
import { ColorStatus } from 'utils/Coloring/ColorStatus';
import {
  TranslateStatusToRussian,
  TranslateSeasonToRussian,
} from 'utils/Translation';

interface CatalogueCardProps {
  index: number;
  item: IData;
  mode?: number;
}

export const AnimeCard: React.FC<CatalogueCardProps> = ({
  index,
  item,
  mode,
}) => {
  !mode && (mode = 0);
  const renderCardGrid = useMemo(() => {
    return (
      <div key={index} className={styles['anime-card']}>
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
        <div className={styles['anime-card-info']}>
          <div
            className={styles['anime-card-info__title']}
            title={item.title_english ? item.title_english : item.title}
          >
            {item.title_english ? item.title_english : item.title}
          </div>
        </div>
      </div>
    );
  }, [index, item]);

  const renderCardList = useMemo(() => {
    return (
      <div key={index} className={styles['anime-card__list']}>
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
                color: ColorStatus(TranslateStatusToRussian(item.status)),
              }}
            >
              {TranslateStatusToRussian(item.status)}
            </span>
            <span>{item.year && ` / ${item.year}`}</span>
            <span>
              {item.season && ` / ${TranslateSeasonToRussian(item.season)}`}
            </span>
          </div>
          <div className={styles['anime-card-info__episodes']}>
            Эпизодов: {item.episodes}
          </div>
          <div className={styles['anime-card-info__description']}>
            Описание: {item.synopsis}
          </div>
        </div>
      </div>
    );
  }, [index, item]);
  return <> {mode === 0 ? renderCardGrid : renderCardList} </>;
};

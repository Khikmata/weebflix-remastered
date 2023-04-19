import React from "react";
import { Link } from "react-router-dom";
import { IData } from "../../types/FetchTypes";
import { ColorRating } from "../../utils/Coloring/ColorRating";
import { Tooltip } from "../../utils/Tooltip";
import styles from './AnimeCard.styles.module.scss';

interface CatalogueCardProps {
	index: number;
	item: IData;
}

export const AnimeCard: React.FC<CatalogueCardProps> = ({ index, item }) => {

	return (
		<div key={index} className={styles['anime-card']}>
			<Link to={`/anime/${item.mal_id}`} className={styles['anime-card__image']}>
				<img
					loading="lazy"
					src={item.images.webp.large_image_url || item.images.webp.image_url}
					alt={item.title_english + 'poster'}
				/>
				<div className={styles['anime-card__image__rating']} style={{ color: ColorRating(item) }}>{item.score || '?'}</div>
			</Link>
			<div className={styles['anime-card__info']}>
				<div className={styles['anime-card__info__title']} title={item.title_english ? item.title_english : item.title}>
					{item.title_english ? item.title_english : item.title}
				</div>
			</div>
		</div>
	);
}
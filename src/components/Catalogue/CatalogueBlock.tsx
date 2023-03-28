
import { Link } from "react-router-dom";
import { IData } from "../../types/GetAnimeTypes";
import { ColorRating } from "../../utils/ColorRating";
import { Tooltip } from "../../utils/Tooltip";

import styles from './CatalogueBlock.styles.module.scss';


interface CatalogueProps {
	index: number;
	item: IData;

}
//Link to = {`/anime/${item.mal_id}`}


const CatalogueBlock: React.FC<CatalogueProps> = ({ index, item }) => {

	return (
		<div key={index} className={styles['anime-card']}>
			<div className={styles['anime-card__image']}>
				<Link to={`/anime/${item.mal_id}`}>
					<img loading="lazy" src={item.images.webp.large_image_url || item.images.webp.image_url} alt={item.title_english + 'poster'} width={200} height={300} />
				</Link>
			</div>
			<div className={styles['anime-card__info']}>
				<Tooltip content={item.title_english || item.title} direction="bottom" delay={500}>
					<div className={styles['anime-card__info__title']}>{item.title_english ? item.title_english : item.title}</div>
				</Tooltip>
				{
					item.score && <div className={styles['anime-card__info__rating']} style={{ color: ColorRating(item) }}>{item.score}</div>
				}
			</div>
		</div>
	)
}

export default CatalogueBlock;
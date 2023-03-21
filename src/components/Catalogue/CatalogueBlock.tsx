
import { Link } from "react-router-dom";
import { IData } from "../../types/GetAnimeTypes";
import { ColorRating } from "../../utils/ColorRating";
import Tooltip from "../../utils/Tooltip/Tooltip";
import styles from './CatalogueBlock.styles.module.scss';


interface CatalogueProps {
	index: number;
	item: IData;

}



const CatalogueBlock: React.FC<CatalogueProps> = ({ index, item }) => {

	return (
		<Link to={`/anime/${item.mal_id}`} key={index} className={styles['anime-card']}>
			<div className={styles['anime-card__image']}>
				<img src={item.images.webp.image_url} alt={item.title_english} width={200} height={300} />
			</div>
			<div className={styles['anime-card__info']}>
				<Tooltip content={item.title_english || item.title} direction="bottom" delay={500}>
					<div className={styles['anime-card__info__title']}>{item.title_english ? item.title_english : item.title}</div>
				</Tooltip>
				<div className={styles['anime-card__info__rating']} style={{ color: ColorRating(item) }}>{item.score}</div>
			</div>
		</Link>
	)
}

export default CatalogueBlock;
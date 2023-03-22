import { IRecommendations } from '../../types/GetAnimeTypes';
import styles from './RecommendationsBlock.styles.module.scss';

interface RecommendationsBlockProps {
	item: IRecommendations[];
}


const RecommendationsBlock: React.FC<RecommendationsBlockProps> = ({ item }) => {


	return (
		<div className={styles['recommendations']}>
			<div className={styles['recommendations-content']}>
				<p>Похожее на то, что вы смотрели ранее:</p>
				<div className={styles['recommendations-content__grid']}>
					{
						item.map((item: IRecommendations) => (
							< img src={item.entry.images.webp.image_url} />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default RecommendationsBlock;
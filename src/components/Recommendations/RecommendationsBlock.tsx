import { AnimeApi } from '../../store/services/getAnime';
import { IRecommendations } from '../../types/GetAnimeTypes';
import styles from './RecommendationsBlock.styles.module.scss';



export const RecommendationsBlock: React.FC = () => {

	const { data: recommendations, error: recommendationsErrors, isLoading: recomendationLoading } = AnimeApi.useGetRecentAnimeRecommendationsQuery(31043);



	return (
		<div className={styles['recommendations']}>
			<div className={styles['recommendations-content']}>
				<p>Похожее на то, что вы смотрели ранее:</p>
				<div className={styles['recommendations-content__grid']}>
					{
						recomendationLoading && <p>Загрузка...</p>
					}
					{
						recommendations && recommendations.map((item: IRecommendations, index: number) => (
							< img key={index} src={item.entry.images.webp.image_url} alt={item.entry.title + ' banner image'} />
						))
					}
					{
						recommendationsErrors && <p>Произошла ошибка при загрузке блока..</p>
					}
				</div>
			</div>
		</div>
	)
}

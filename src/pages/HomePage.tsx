


import CatalogueBlock from '../components/Catalogue/CatalogueBlock';
import CatalogueFilterBlock from '../components/CatalogueFilter/CatalogueFilterBlock';
import HistoryBlock from '../components/History/HistoryBlock';
import NewsBlock from '../components/News/NewsBlock';
import RecommendationsBlock from '../components/Recommendations/RecommendationsBlock';
import { AnimeApi } from '../store/services/getAnime';
import { IData } from '../types/GetAnimeTypes';
import styles from './home.styles.module.scss';



const HomePage = () => {

	const { data: currentSeasonData, error: currentSeasonErrors, isLoading: currentSeasonLoading } = AnimeApi.useGetCurrentSeasonQuery(5)
	const { data: upcomingSeasonData, error: upcomingSeasonErrors, isLoading: upcomingSeasonLoading } = AnimeApi.useGetCurrentSeasonQuery(5)
	const { data: recommendationsData, error: recommendationsErrors, isLoading: recomendationLoading } = AnimeApi.useGetRecentAnimeRecommendationsQuery(31043);

	const currentSeason = currentSeasonData && currentSeasonData.data;
	currentSeason && console.log(currentSeasonData);



	return (
		<div className={styles['home']}>
			<div className={styles['home-background']} />
			<div className={styles['home-container']}>
				<CatalogueFilterBlock />
				<div className={styles.catalogue} >
					{
						currentSeason ? currentSeason.map((item: IData, index: number) => (
							<CatalogueBlock key={item.mal_id} item={item} index={index} />
						)) : <h1> loading...</h1>
					}
				</div >
				<div className={styles['home-container__content']}>
					<div className={styles['home-content__left']}>
						<HistoryBlock />
						{recommendationsData &&
							<RecommendationsBlock item={recommendationsData.slice(0, 4)} />
						}
					</div>
					<div className={styles['home-content__right']}>
						<NewsBlock />
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
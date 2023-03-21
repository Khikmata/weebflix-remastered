


import CatalogueBlock from '../components/Catalogue/CatalogueBlock';
import CatalogueFilterBlock from '../components/CatalogueFilter/CatalogueFilterBlock';
import HistoryBlock from '../components/History/HistoryBlock';
import NewsBlock from '../components/News/NewsBlock';
import { AnimeApi } from '../services/getAnime';
import { IData } from '../types/GetAnimeTypes';
import styles from './home.styles.module.scss';



const HomePage = () => {

	const { data: currentSeasonData, error, isLoading } = AnimeApi.useGetCurrentSeasonQuery(5)
	const { data: recommendationsData, error: recommendationsErrors, isLoading: recomendationLoading } = AnimeApi.useGetRecentAnimeRecommendationsQuery(31043);

	const currentSeason = currentSeasonData && currentSeasonData.data;
	console.log(currentSeasonData)

	if (isLoading) {
		return <h1>loading...</h1>
	}

	return (
		<div className={styles['home']}>
			<div className={styles['home-background']} />
			<div className={styles['home-container']}>
				<CatalogueFilterBlock />
				<div className={styles.catalogue} >
					{
						currentSeason && currentSeason.map((item: IData, index: number) => (
							<CatalogueBlock key={item.mal_id} item={item} index={index} />
						))
					}
				</div >
				<div className={styles['home-container__content']}>
					<div className={styles['home-content__left']}>
						<HistoryBlock />
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
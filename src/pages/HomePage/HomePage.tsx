
import { AnimeGridBlock } from '../../components/Blocks/AnimeGrid';
import { CatalogueBlock } from '../../components/Blocks/Catalogue';
import { CatalogueFilterBlock } from '../../components/Blocks/CatalogueCategory';
import { HistoryBlock } from '../../components/Blocks/History';
import { NewsBlock } from '../../components/Blocks/News';
import { RecommendationsBlock } from '../../components/Blocks/Recommendations';

import styles from './home.styles.module.scss';


const HomePage = () => {



	return (
		<div className={styles['home']} >
			<div className={styles['home-background']} />
			<div className={styles['home-container']}>
				<CatalogueFilterBlock />
				<CatalogueBlock />
				<div className={styles['home-container__content']}>
					<div className={styles['home-content__left']}>
						<HistoryBlock />
						<RecommendationsBlock />
					</div>
					<div className={styles['home-content__right']}>
						<NewsBlock />
					</div>
				</div>
				<AnimeGridBlock />
			</div>
		</div >
	)
}

export default HomePage;
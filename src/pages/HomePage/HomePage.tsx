


import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import CatalogueBlock from '../../components/Catalogue/CatalogueBlock';
import CatalogueFilterBlock from '../../components/CatalogueFilter/CatalogueFilterBlock';
import HistoryBlock from '../../components/History/HistoryBlock';
import NewsBlock from '../../components/News/NewsBlock';
import RecommendationsBlock from '../../components/Recommendations/RecommendationsBlock';
import { useAppSelector } from '../../hooks/redux';
import { AnimeApi } from '../../store/services/getAnime';

import { IData } from '../../types/GetAnimeTypes';

import styles from './home.styles.module.scss';

const HomePage = () => {

	const { data: currentSeason, error: currentSeasonErrors, isLoading: currentSeasonLoading } = AnimeApi.useGetCurrentSeasonQuery(5)
	const { data: upcomingSeason, error: upcomingSeasonErrors, isLoading: upcomingSeasonLoading } = AnimeApi.useGetUpcomingSeasonQuery(5)


	const selectedFilterOption = useAppSelector((state) => state.catalogueFilter.activeFilterIndex);

	const currentFilter = [currentSeason, upcomingSeason]



	return (
		<div className={styles['home']} >
			<div className={styles['home-background']} />
			<div className={styles['home-container']}>
				<CatalogueFilterBlock />
				<div className={styles.catalogue} >
					<Swiper
						modules={[Navigation, FreeMode]}
						speed={400}
						spaceBetween={8}
						slidesPerView={6}
						navigation
						breakpoints={{
							0: {
								slidesPerView: 2,
							},
							426: {
								slidesPerView: 2,
							},
							600: {
								slidesPerView: 3,
							},
							869: {
								slidesPerView: 4,
							},
							1025: {
								slidesPerView: 5,
							},
							1225: {
								slidesPerView: 6,
							},
						}}
					>
						{

						}
						{
							currentFilter && currentFilter[selectedFilterOption]?.data.map((item: IData, index: number) => (
								<SwiperSlide>
									<CatalogueBlock key={item.mal_id} item={item} index={index} />
								</SwiperSlide>
							))
						}
					</Swiper>
				</div >
				<div className={styles['home-container__content']}>
					<div className={styles['home-content__left']}>
						<HistoryBlock />
						<RecommendationsBlock />
					</div>
					<div className={styles['home-content__right']}>
						<NewsBlock />
					</div>
				</div>
			</div>
		</div >
	)
}

export default HomePage;
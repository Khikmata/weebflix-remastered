

import { useRef } from 'react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { CatalogueBlock } from '../../components/Catalogue';
import { CatalogueFilterBlock } from '../../components/CatalogueFilter';
import { HistoryBlock } from '../../components/History';
import { NewsBlock } from '../../components/News';
import { RecommendationsBlock } from '../../components/Recommendations';
import { useAppSelector } from '../../hooks/redux';
import { AnimeApi } from '../../store/services/getAnime';

import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IData } from '../../types/GetAnimeTypes';
import styles from './home.styles.module.scss';

const HomePage = () => {

	const { data: currentSeason, error: currentSeasonErrors, isLoading: currentSeasonLoading } = AnimeApi.useGetCurrentSeasonQuery(5)
	const { data: upcomingSeason, error: upcomingSeasonErrors, isLoading: upcomingSeasonLoading } = AnimeApi.useGetUpcomingSeasonQuery(5)


	const selectedFilterOption = useAppSelector((state) => state.catalogueFilter.activeFilterIndex);

	const currentFilter = [currentSeason, upcomingSeason]


	const swiperRef = useRef(null);


	return (
		<div className={styles['home']} >
			<div className={styles['home-background']} />
			<div className={styles['home-container']}>
				<CatalogueFilterBlock />
				<div className={styles.catalogue}>
					<Swiper
						modules={[Navigation, FreeMode]}
						speed={400}
						spaceBetween={54}
						slidesPerView={6}
						navigation={{
							prevEl: '.prev-button',
							nextEl: '.next-button',
						}}
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
						<button className='prev-button'></button>
						{
							currentFilter && currentFilter[selectedFilterOption]?.data.map((item: IData, index: number) => (
								<SwiperSlide>
									<CatalogueBlock key={item.mal_id} item={item} index={index} />
								</SwiperSlide>
							))
						}
						<button className='next-button'></button>
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
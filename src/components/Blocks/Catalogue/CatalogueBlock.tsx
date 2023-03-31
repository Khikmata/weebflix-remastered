
import { Link } from "react-router-dom";
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from "../../../hooks/redux";
import { AnimeApi } from '../../../store/services/getAnime';
import { IData } from "../../../types/GetAnimeTypes";
import { ColorRating } from "../../../utils/ColorRating";
import { Tooltip } from "../../../utils/Tooltip";
import styles from './CatalogueBlock.styles.module.scss';

import { useMemo } from "react";
import 'swiper/scss';
import 'swiper/scss/navigation';


export const CatalogueBlock: React.FC = () => {


	const { data: currentSeason, error: currentSeasonErrors, isLoading: currentSeasonLoading } = AnimeApi.useGetTopAnimeQuery(5)
	const { data: upcomingSeason, error: upcomingSeasonErrors, isLoading: upcomingSeasonLoading } = AnimeApi.useGetUpcomingSeasonQuery(5)


	const selectedFilterOption = useAppSelector((state) => state.catalogueFilter.activeFilterIndex);

	const currentFilter = useMemo(() => [currentSeason, upcomingSeason], [currentSeason, upcomingSeason])

	return (

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
				freeMode={{
					enabled: true,
					sticky: true,
					momentumRatio: 0.5,
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
									<div className={styles['anime-card__info__rating']} style={{ color: ColorRating(item) }}>{item.score || '?'}</div>
								</div>
							</div>
						</SwiperSlide>
					))
				}
				<button className='next-button'></button>
			</Swiper>
		</div >
	)
}

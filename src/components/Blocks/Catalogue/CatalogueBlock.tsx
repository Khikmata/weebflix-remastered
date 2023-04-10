
import { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from "../../../hooks/redux";
import { AnimeApi } from '../../../store/services/getAnime';
import { IData } from "../../../types/GetAnimeTypes";

import styles from './CatalogueBlock.styles.module.scss';

import { useMemo } from "react";
import 'swiper/scss';
import 'swiper/scss/navigation';
import { AnimeCard } from '../../Card';

export const CatalogueBlock: React.FC = () => {


	const { data: currentSeason, error: currentSeasonErrors, isLoading: currentSeasonLoading } = AnimeApi.useGetCurrentSeasonQuery(5)
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
						spaceBetween: 12,
					},
					426: {
						slidesPerView: 2,
						spaceBetween: 54,
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
					currentFilter[0] && currentSeasonLoading && <p> Загрузка каталога...</p>
				}
				{
					currentFilter[1] && upcomingSeasonLoading && <p> Загрузка каталога...</p>
				}
				{
					currentFilter[0] && currentSeasonErrors && <p>Ошибка при загрузке данных каталога</p>
				}
				{
					currentFilter[1] && upcomingSeasonErrors && <p> Ошибка при загрузке данных каталога</p>
				}
				{
					currentFilter && currentFilter[selectedFilterOption]?.data.map((item: IData, index: number) => (
						<SwiperSlide key={index}>
							<AnimeCard index={index} item={item} />
						</SwiperSlide>
					))
				}
				<button className='next-button'></button>
			</Swiper>
		</div >
	)
}

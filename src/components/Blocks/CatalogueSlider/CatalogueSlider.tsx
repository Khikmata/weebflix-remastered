import { FreeMode, Grid, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/FetchTypes'

import styles from './CatalogueSlider.styles.module.scss'

import { useMemo } from 'react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { AnimeCard } from '../../Card'

export const CatalogueSlider: React.FC = () => {
    const {
        data: currentSeason,
        error: currentSeasonErrors,
        isLoading: currentSeasonLoading,
    } = AnimeApi.useGetCurrentSeasonQuery(5)
    const {
        data: upcomingSeason,
        error: upcomingSeasonErrors,
        isLoading: upcomingSeasonLoading,
    } = AnimeApi.useGetUpcomingSeasonQuery(5)

    const selectedFilterOption = useAppSelector(
        (state) => state.catalogueSlider.activeSliderIndex
    )

    const currentFilter = useMemo(
        () => [currentSeason, upcomingSeason],
        [currentSeason, upcomingSeason]
    )

    return (
        <div className={styles.catalogueSlider}>
            <Swiper
                modules={[Navigation, FreeMode, Grid]}
                speed={400}
                spaceBetween={30}
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
                        spaceBetween: 10,
                    },
                    386: {
                        slidesPerView: 3,
                        spaceBetween: 10,
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
                <button className="prev-button"></button>
                {currentFilter[0] && currentSeasonLoading && (
                    <p> Загрузка каталога...</p>
                )}
                {currentFilter[1] && upcomingSeasonLoading && (
                    <p> Загрузка каталога...</p>
                )}
                {currentFilter[0] && currentSeasonErrors && (
                    <p>Ошибка при загрузке данных каталога</p>
                )}
                {currentFilter[1] && upcomingSeasonErrors && (
                    <p> Ошибка при загрузке данных каталога</p>
                )}
                {currentFilter &&
                    currentFilter[selectedFilterOption]?.map(
                        (item: IData, index: number) => (
                            <SwiperSlide key={index}>
                                <AnimeCard index={index} item={item} />
                            </SwiperSlide>
                        )
                    )}
                <button className="next-button"></button>
            </Swiper>
        </div>
    )
}

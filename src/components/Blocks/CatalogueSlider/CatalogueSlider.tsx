import { FreeMode, Grid, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/FetchTypes'
import { Suspense } from 'react'
import styles from './CatalogueSlider.styles.module.scss'

import { useMemo } from 'react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { AnimeCard } from '../../UI/AnimeCard'
import { LoadingComponent } from '../../UI/Loading'

import nextArrow from '../../../assets/icons/nextArrow.svg';
import prevArrow from '../../../assets/icons/prevArrow.svg';

export const CatalogueSlider: React.FC = () => {
  const { data: currentSeason, error: currentSeasonErrors, isLoading: currentSeasonLoading, } = AnimeApi.useGetCurrentSeasonQuery()
  const { data: upcomingSeason, error: upcomingSeasonErrors, isLoading: upcomingSeasonLoading, } = AnimeApi.useGetUpcomingSeasonQuery()

  const selectedFilterOption = useAppSelector((state) => state.catalogueSlider.activeSliderIndex)

  const currentFilter = useMemo(() => [currentSeason, upcomingSeason],
    [currentSeason, upcomingSeason],
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
          430: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 36,
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
        <button className="prev-button">
          <img width={8} src={prevArrow} alt='' />
        </button>
        {currentFilter[0] && currentSeasonLoading && <span> Загрузка каталога... <LoadingComponent /></span>}
        {currentFilter[1] && upcomingSeasonLoading && <span>  Загрузка каталога... <LoadingComponent /> </span>}
        {currentFilter[0] && currentSeasonErrors && <p>Ошибка при загрузке данных каталога</p>}
        {currentFilter[1] && upcomingSeasonErrors && <p> Ошибка при загрузке данных каталога</p>}
        {currentFilter &&
          currentFilter[selectedFilterOption]?.map((item: IData, index: number) => (
            <SwiperSlide key={index}>
              <Suspense fallback={<LoadingComponent />}>
                <AnimeCard index={index} item={item} />
              </Suspense>
            </SwiperSlide>
          ))}
        <button className="next-button">
          <img width={8} src={nextArrow} alt='' />
        </button>
      </Swiper>
    </div>
  )
}

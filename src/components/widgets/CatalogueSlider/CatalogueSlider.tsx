import { Suspense, useEffect, useMemo } from 'react'
import { FreeMode, Grid, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useAppSelector } from '../../../hooks/redux'
import { IData } from '../../../types/FetchTypes'
import styles from './CatalogueSlider.styles.module.scss'

import nextArrow from '../../../assets/icons/NextArrowIcon.svg'
import prevArrow from '../../../assets/icons/PrevArrowIcon.svg'
import { AnimeApi } from '../../../store/services'

import 'swiper/scss'
import 'swiper/scss/navigation'
import { AnimeCard, Loading } from '../../shared'
import { useTranslation } from 'react-i18next'

export const CatalogueSlider: React.FC = () => {
  const selectedSliderOption = useAppSelector(
    (state) => state.catalogueSlider.activeSliderIndex,
  )

  const { t } = useTranslation()
  //
  const {
    data: currentSeason,
    error: currentSeasonErrors,
    isLoading: currentSeasonLoading,
  } = AnimeApi.useGetCurrentSeasonQuery()
  const [
    triggerSeason,
    {
      data: upcomingSeason,
      error: upcomingSeasonErrors,
      isLoading: upcomingSeasonLoading,
    },
  ] = AnimeApi.useLazyGetUpcomingSeasonQuery({})

  const activeFilter = useMemo(
    () => [currentSeason, upcomingSeason],
    [currentSeason, upcomingSeason],
  )

  useEffect(() => {
    if (selectedSliderOption === 1) {
      triggerSeason()
    }
  }, [selectedSliderOption])

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
          <img width={8} src={prevArrow} alt="" />
        </button>
        {activeFilter[0] && currentSeasonLoading && (
          <span>
            {' '}
            Загрузка каталога... <Loading />
          </span>
        )}
        {activeFilter[1] && upcomingSeasonLoading && (
          <span>
            {' '}
            Загрузка каталога... <Loading />{' '}
          </span>
        )}

        {activeFilter[0] && currentSeasonErrors && (
          <p>Ошибка при загрузке данных каталога</p>
        )}
        {activeFilter[1] && upcomingSeasonErrors && (
          <p> Ошибка при загрузке данных каталога</p>
        )}

        {activeFilter &&
          activeFilter[selectedSliderOption]?.map(
            (item: IData, index: number) => (
              <SwiperSlide key={index}>
                <Suspense fallback={<Loading />}>
                  <AnimeCard index={index} item={item} />
                </Suspense>
              </SwiperSlide>
            ),
          )}
        <button className="next-button">
          <img width={8} src={nextArrow} alt="" />
        </button>
      </Swiper>
    </div>
  )
}

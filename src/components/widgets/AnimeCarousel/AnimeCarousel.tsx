import { Suspense, useEffect, useMemo } from 'react'
import { FreeMode, Grid, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IData } from '@store/types/FetchTypes'
import { useAppSelector } from 'hooks/redux'
import styles from './AnimeCarousel.styles.module.scss'

import nextArrow from '@assets/icons/NextArrowIcon.svg'
import prevArrow from '@assets/icons/PrevArrowIcon.svg'
import { AnimeApi } from '@store/services'

import { AnimeCard, Loading } from '@components/shared'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { breakpointValues } from './constants'

export const AnimeCarousel: React.FC = () => {
  const selectedCarouselOption = useAppSelector(
    (state) => state.carousel.activeCarouselOptionIndex,
  )

  const { data: currentSeason } = AnimeApi.useGetCurrentSeasonQuery()
  const [triggerSeason, { data: upcomingSeason }] =
    AnimeApi.useLazyGetUpcomingSeasonQuery({})

  const activeFilter = useMemo(
    () => [currentSeason, upcomingSeason],
    [currentSeason, upcomingSeason],
  )

  useEffect(() => {
    if (selectedCarouselOption === 1 && !upcomingSeason) {
      triggerSeason()
    }
  }, [selectedCarouselOption])

  return (
    <div className={styles.animeCarousel}>
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
        breakpoints={breakpointValues}
      >
        <PrevPaginationButton />
        {activeFilter[selectedCarouselOption]?.map(
          (item: IData, index: number) => (
            <SwiperSlide key={index}>
              <Suspense fallback={<Loading />}>
                <AnimeCard item={item} />
              </Suspense>
            </SwiperSlide>
          ),
        )}
        <NextPaginationButton />
      </Swiper>
    </div>
  )
}

const PrevPaginationButton = () => {
  return (
    <button className="prev-button">
      <img width={8} src={prevArrow} alt="" />
    </button>
  )
}
const NextPaginationButton = () => {
  return (
    <button className="next-button">
      <img width={8} src={nextArrow} alt="" />
    </button>
  )
}

import { memo } from 'react'
import { FreeMode, Grid, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IData } from '@store/types/FetchTypes'
import styles from './AnimeCarousel.styles.module.scss'

import { ReactComponent as NextArrow } from '@assets/icons/NextArrowIcon.svg'
import { ReactComponent as PrevArrow } from '@assets/icons/PrevArrowIcon.svg'

import { AnimeCard } from '@components/shared'

import 'swiper/scss'
import 'swiper/scss/navigation'
import { breakpointValues } from './constants'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface AnimeCarouselProps {
  data: IData[] | null | undefined
}

export const AnimeCarousel = memo(({ data }: AnimeCarouselProps) => {
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
        {data
          ? data?.map((item: IData, index: number) => (
              <SwiperSlide key={index}>
                <AnimeCard item={item} />
              </SwiperSlide>
            ))
          : Array.from({ length: 6 }).map((item, index: number) => (
              <SwiperSlide key={index}>
                <Skeleton
                  baseColor="gray"
                  highlightColor="lightgray"
                  className={styles['skeleton']}
                ></Skeleton>
                <Skeleton
                  baseColor="gray"
                  highlightColor="lightgray"
                  className={styles['skeleton__title']}
                ></Skeleton>
              </SwiperSlide>
            ))}
        <NextPaginationButton />
      </Swiper>
    </div>
  )
})

const PrevPaginationButton = () => {
  return (
    <button className="prev-button">
      <PrevArrow />
    </button>
  )
}

const NextPaginationButton = () => {
  return (
    <button className="next-button">
      <NextArrow />
    </button>
  )
}

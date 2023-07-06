import nextArrowIcon from '@assets/icons/NextArrowIcon.svg'
import prevArrowIcon from '@assets/icons/PrevArrowIcon.svg'
import { Loading } from '@components/shared'
import { AnimeApi } from '@store/services'
import { IRecommendations } from '@store/types/FetchTypes'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FreeMode, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './RecommendationSection.styles.module.scss'
import { breakpoints } from './breakpoints'

export const RecommendationSection: React.FC = () => {
  const {
    data: recommendation,
    error: recommendationErrors,
    isLoading: recomendationLoading,
  } = AnimeApi.useGetRecentAnimeRecommendationsQuery(31043)
  const { t } = useTranslation()
  return (
    <div className={styles['recommendation']}>
      <div className={styles['recommendation-content']}>
        <p>{t('recommendationsection_title')}</p>
        <div className={styles['recommendation-content__grid']}>
          <Swiper
            modules={[Navigation, FreeMode]}
            speed={400}
            spaceBetween={12}
            slidesPerView={4}
            navigation={{
              prevEl: '.prev-button',
              nextEl: '.next-button',
            }}
            freeMode={{
              enabled: true,
              sticky: true,
              momentumRatio: 0.5,
            }}
            breakpoints={breakpoints}
          >
            <button className="prev-button">
              <img width={8} src={prevArrowIcon} alt="" />
            </button>
            {recomendationLoading && (
              <>
                Загрузка блока рекоммендаций... <Loading />
              </>
            )}
            {recommendationErrors && (
              <p>Произошла ошибка при загрузке блока..</p>
            )}
            {recommendation?.map((item: IRecommendations) => (
              <SwiperSlide key={item.entry.mal_id}>
                <Link
                  className={styles['content-grid-card']}
                  to={`/anime/${item.entry.mal_id}`}
                >
                  <img
                    className={styles['content-grid-card__image']}
                    src={item.entry?.images.webp.image_url}
                    alt={item.entry.title + ' banner image'}
                  />
                  <p className={styles['content-grid-card__votes']}>
                    +{item.votes}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
            <button className="next-button">
              <img height={8} width={8} src={nextArrowIcon} alt="" />
            </button>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

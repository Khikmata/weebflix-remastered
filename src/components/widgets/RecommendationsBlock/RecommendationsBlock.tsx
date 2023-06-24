import nextArrowIcon from '@assets/icons/NextArrowIcon.svg'
import prevArrowIcon from '@assets/icons/PrevArrowIcon.svg'
import { Loading } from '@components/shared'
import { AnimeApi } from '@store/services'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FreeMode, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IRecommendations } from 'types/FetchTypes'
import styles from './RecommendationsBlock.styles.module.scss'

export const RecommendationsBlock: React.FC = () => {
  const {
    data: recommendations,
    error: recommendationsErrors,
    isLoading: recomendationLoading,
  } = AnimeApi.useGetRecentAnimeRecommendationsQuery(31043)
  const { t } = useTranslation()
  return (
    <div className={styles['recommendations']}>
      <div className={styles['recommendations-content']}>
        <p>{t('recommendedationsBlock_title')}</p>
        <div className={styles['recommendations-content__grid']}>
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
            breakpoints={{
              0: {
                slidesPerView: 3,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 4,
              },
              500: {
                slidesPerView: 5,
              },
              600: {
                slidesPerView: 5,
                spaceBetween: 8,
              },
              800: {
                slidesPerView: 6,
                spaceBetween: 8,
              },
              900: {
                slidesPerView: 7,
                spaceBetween: 16,
              },
              1000: {
                spaceBetween: 20,
                slidesPerView: 4,
              },
            }}
          >
            <button className="prev-button">
              <img width={8} src={prevArrowIcon} alt="" />
            </button>
            {recomendationLoading && (
              <span>
                Загрузка блока рекоммендаций... <Loading />{' '}
              </span>
            )}
            {recommendationsErrors && (
              <p>Произошла ошибка при загрузке блока..</p>
            )}
            {recommendations &&
              recommendations.map((item: IRecommendations, index: number) => (
                <SwiperSlide key={index}>
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

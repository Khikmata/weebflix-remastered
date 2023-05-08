import { Link } from 'react-router-dom'
import { FreeMode, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AnimeApi } from '../../../store/services/getAnime'
import { IRecommendations } from '../../../types/FetchTypes'
import { LoadingComponent } from '../../UI/Loading'
import styles from './RecommendationsBlock.styles.module.scss'

export const RecommendationsBlock: React.FC = () => {
  const {
    data: recommendations,
    error: recommendationsErrors,
    isLoading: recomendationLoading,
  } = AnimeApi.useGetRecentAnimeRecommendationsQuery(31043)

  return (
    <div className={styles['recommendations']}>
      <div className={styles['recommendations-content']}>
        <p>Похожее на то, что вы смотрели ранее:</p>
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
                slidesPerView: 2,
                spaceBetween: 8,
              },
              800: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              900: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
              1225: {
                spaceBetween: 20,
                slidesPerView: 4,
              },
            }}
          >
            <button className="prev-button"></button>
            {recomendationLoading && <span>Загрузка блока рекоммендаций... <LoadingComponent /> </span>}
            {recommendationsErrors && <p>Произошла ошибка при загрузке блока..</p>}
            {recommendations &&
              recommendations.map((item: IRecommendations, index: number) => (
                <SwiperSlide key={index}>
                  <Link className={styles['content-grid__card']} to={`/anime/${item.entry.mal_id}`}>
                    <img
                      src={item.entry?.images.webp.image_url}
                      alt={item.entry.title + ' banner image'}
                    />
                    <p>+{item.votes}</p>
                  </Link>
                </SwiperSlide>
              ))}
            <button className="next-button"></button>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

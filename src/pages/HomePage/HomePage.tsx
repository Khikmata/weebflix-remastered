import homeBackground from '@assets/images/home.webp'

import { OptionsBlock } from '@components/features'
import { PageWrapper } from '@components/shared/PageWrapper/PageWrapper'
import { AnimeCarousel, AnimeGrid } from '@components/widgets'
import { CarouselActions } from '@store/reducers/Carousel/CarouselOptionsSlice'
import { CatalogueActions } from '@store/reducers/Catalogue/CatalogueSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimeApi } from '@store/services'
import styles from './home.styles.module.scss'
const HomePage = () => {
  const { t } = useTranslation()

  const animeCarouselOptions = [
    { id: 0, value: t('option_relevance') },
    { id: 1, value: t('option_upcoming') },
  ]
  const catalogueOptions = [
    { id: 0, value: t('option_anime') },
    { id: 1, value: t('option_manga') },
  ]

  const dispatch = useAppDispatch()

  const handleCarouselOptions = (index: number) => {
    dispatch(CarouselActions.setActiveCarouselOptionIndex(index))
  }
  const handleCatalogueOptions = (index: number) => {
    dispatch(CatalogueActions.setActiveCatalogueOptionIndex(index))
  }

  const activeCarouselOptionIndex = useAppSelector(
    (state) => state.carousel.activeCarouselOptionIndex,
  )
  const activeCatalogueOptionIndex = useAppSelector(
    (state) => state.catalogue.activeCatalogueOptionIndex,
  )

  const { data: currentSeason } = AnimeApi.useGetCurrentSeasonQuery()
  const [triggerSeason, { data: upcomingSeason }] =
    AnimeApi.useLazyGetUpcomingSeasonQuery({})

  useEffect(() => {
    if (activeCarouselOptionIndex === 1 && !upcomingSeason) {
      triggerSeason()
    }
  }, [activeCarouselOptionIndex, triggerSeason, upcomingSeason])

  return (
    <>
      <PageWrapper source={homeBackground} filled={false}>
        <OptionsBlock
          options={animeCarouselOptions}
          handleOptions={handleCarouselOptions}
          activeOption={activeCarouselOptionIndex}
        />
        <div className={styles['homepage__carousel']}>
          <AnimeCarousel
            data={
              activeCarouselOptionIndex === 0 ? currentSeason : upcomingSeason
            }
          />
        </div>
        {/* <TwoColumn>
        <div className={styles['home-content__left']}>
          <HistoryBlock />
          <RecommendationSection />
        </div>
        <div className={styles['home-content__right']}>
          <NewsBlock />
        </div>
      </TwoColumn> */}
        <OptionsBlock
          options={catalogueOptions}
          handleOptions={handleCatalogueOptions}
          activeOption={activeCatalogueOptionIndex}
        />
        <AnimeGrid title="catalogue_title" />
      </PageWrapper>
    </>
  )
}

export default HomePage

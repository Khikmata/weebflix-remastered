import homeBackground from '@assets/images/home.webp'

import { TwoColumn } from '@components/shared'
import { PageWrapper } from '@components/shared/PageWrapper/PageWrapper'
import {
  AnimeCarousel,
  AnimeGrid,
  NewsBlock,
  OptionsBlock,
  RecommendationsBlock,
} from '@components/widgets'
import { HistoryBlock } from '@components/widgets/HistoryBlock/HistoryBlock'
import { CarouselActions } from '@store/reducers/Carousel/CarouselOptionsSlice'
import { CatalogueActions } from '@store/reducers/Catalogue/CatalogueSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useTranslation } from 'react-i18next'
import styles from './home.styles.module.scss'

export const HomePage = () => {
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

  return (
    <PageWrapper source={homeBackground} filled={false}>
      <OptionsBlock
        options={animeCarouselOptions}
        handleOptions={handleCarouselOptions}
        activeOption={activeCarouselOptionIndex}
      />
      <AnimeCarousel />
      <TwoColumn>
        <div className={styles['home-content__left']}>
          <HistoryBlock />
          <RecommendationsBlock />
        </div>
        <div className={styles['home-content__right']}>
          <NewsBlock />
        </div>
      </TwoColumn>
      <OptionsBlock
        options={catalogueOptions}
        handleOptions={handleCatalogueOptions}
        activeOption={activeCatalogueOptionIndex}
      />
      <AnimeGrid />
    </PageWrapper>
  )
}

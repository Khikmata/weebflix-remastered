import homeBackground from '@assets/images/home.webp'

import { TwoColumn } from '@components/shared'
import { PageWrapper } from '@components/shared/PageWrapper/PageWrapper'
import {
  AnimeGridBlock,
  CatalogueSlider,
  NewsBlock,
  OptionsBlock,
  RecommendationsBlock,
} from '@components/widgets'
import { AuthModal } from '@components/widgets/AuthModal/AuthModal'
import { HistoryBlock } from '@components/widgets/History/HistoryBlock'
import { useTranslation } from 'react-i18next'
import styles from './home.styles.module.scss'

export const HomePage = () => {
  const { t } = useTranslation()
  const catalogueSliderOptions = [t('option_relevance'), t('option_upcoming')]
  const catalogueOptions = [t('option_anime'), t('option_manga')]

  return (
    <PageWrapper source={homeBackground} filled={false}>
      <AuthModal />
      <OptionsBlock options={catalogueSliderOptions} />
      <CatalogueSlider />
      <TwoColumn>
        <div className={styles['home-content__left']}>
          <HistoryBlock />
          <RecommendationsBlock />
        </div>
        <div className={styles['home-content__right']}>
          <NewsBlock />
        </div>
      </TwoColumn>
      <OptionsBlock options={catalogueOptions} />
      <AnimeGridBlock />
    </PageWrapper>
  )
}

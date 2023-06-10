

import homeBackground from '@assets/images/home.webp'

import styles from './home.styles.module.scss'
import { AuthModal } from '@components/widgets/AuthModal/AuthModal'
import { AnimeGridBlock, CatalogueSlider, NewsBlock, OptionsBlock, RecommendationsBlock } from '@components/widgets'
import { HistoryBlock } from '@components/widgets/History/HistoryBlock'

export const HomePage = () => {
  const catalogueSliderOptions = ['Актуальное', 'Скоро выйдет']
  const catalogueOptions = ['Аниме', '-']

  return (
    <div className={styles['home']}>
      <AuthModal />
      <div className={styles['home-background__overlay']} />
      <img
        src={homeBackground}
        alt="задний фон"
        loading='lazy'
        decoding='async'
        className={styles['home-background']}
      />
      <div className={styles['home-container']}>
        <OptionsBlock options={catalogueSliderOptions} />
        <CatalogueSlider />
        <div className={styles['home-container__content']}>
          <div className={styles['home-content__left']}>
            <HistoryBlock />
            <RecommendationsBlock />
          </div>
          <div className={styles['home-content__right']}>
            <NewsBlock />
          </div>
        </div>
        <OptionsBlock options={catalogueOptions} />
        <AnimeGridBlock />
      </div>
    </div>
  )
}

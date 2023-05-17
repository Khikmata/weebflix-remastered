import { AnimeGridBlock } from '../../components/Blocks/AnimeGrid'
import { CatalogueSlider } from '../../components/Blocks/CatalogueSlider'
import { HistoryBlock } from '../../components/Blocks/History'
import { NewsBlock } from '../../components/Blocks/News'
import { OptionsBlock } from '../../components/Blocks/OptionsBlock'
import { RecommendationsBlock } from '../../components/Blocks/Recommendations'

import homeBackground from '../../assets/images/home.webp'
import styles from './home.styles.module.scss'

export const HomePage = () => {
  const catalogueSliderOptions = ['Актуальное', 'Скоро выйдет']
  const catalogueOptions = ['Аниме', 'Манга(Скоро...)']

  return (
    <div className={styles['home']}>
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

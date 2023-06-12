import homeBackground from '@assets/images/home.webp';

import { PageWrapper } from '@components/shared/PageWrapper/PageWrapper';
import {
  AnimeGridBlock,
  CatalogueSlider,
  NewsBlock,
  OptionsBlock,
  RecommendationsBlock,
} from '@components/widgets';
import { AuthModal } from '@components/widgets/AuthModal/AuthModal';
import { HistoryBlock } from '@components/widgets/History/HistoryBlock';
import styles from './home.styles.module.scss';

export const HomePage = () => {
  const catalogueSliderOptions = ['Актуальное', 'Скоро выйдет'];
  const catalogueOptions = ['Аниме', '-'];

  return (
    <PageWrapper source={homeBackground} filled={false}>
      <AuthModal />
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
    </PageWrapper>
  );
};

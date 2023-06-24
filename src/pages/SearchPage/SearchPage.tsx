import { AnimeGridBlock } from '../../components/widgets'
import styles from './SearchPage.styles.module.scss'

export const SearchPage = () => {
  return (
    <div className={styles['searchPage']}>
      <div className={styles['searchPage-container']}>
        <AnimeGridBlock />
      </div>
    </div>
  )
}

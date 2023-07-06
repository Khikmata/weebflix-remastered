import { PageWrapper } from '@components/shared'
import { AnimeGrid } from '@components/widgets'
import styles from './SearchPage.styles.module.scss'
const SearchPage = () => {
  return (
    <>
      <PageWrapper filled={false}>
        <div className={styles['searchpage-searchbar']}></div>
        <AnimeGrid title={'search_title'} />
      </PageWrapper>
    </>
  )
}

export default SearchPage

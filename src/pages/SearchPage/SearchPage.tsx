import { AnimeGridBlock } from '../../components/Blocks/AnimeGrid'
import styles from './SearchPage.styles.module.scss'

type Props = {}

export const SearchPage = (props: Props) => {
	return (
		<div className={styles['searchPage']}>
			<div className={styles['searchPage-container']}>
				<AnimeGridBlock />
			</div>
		</div>
	)
}
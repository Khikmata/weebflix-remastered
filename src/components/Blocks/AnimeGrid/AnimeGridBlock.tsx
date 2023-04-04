import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/GetAnimeTypes'
import { AnimeCard } from '../../Card'

import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {
	const { data: top100Data, error: top1000Errors, isLoading: top100Loading } = AnimeApi.useGetTopAnimeQuery(5)


	return (
		<div className={styles['animegrid']}>
			<div className={styles['animegrid-container']}>
				<h2>Топ 100</h2>
				<div className={styles['animegrid-container__content']}>
					<div className={styles['animegrid-content__items']}>
						{
							top100Data && top100Data.data.map((item: IData, index: number) => (
								<AnimeCard index={index} item={item} />
							))
						}
					</div>
					<div className={styles['animegrid-content__filter']}>
						<p>Фильтр</p>
					</div>
				</div>
			</div>
		</div>
	)
}

import { useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/GetAnimeTypes'
import { AnimeCard } from '../../Card'

import { FilterBlock } from '../Filter'

import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {

	const maxScore = useAppSelector(state => state.searchFilter.maxScore)
	const minScore = useAppSelector(state => state.searchFilter.minScore)
	console.log(maxScore)
	console.log(minScore)
	const { data: top100Data, error: top100Errors, isLoading: top100Loading } = AnimeApi.useGetTopAnimeQuery(5);
	const { data: filteredData, error: filteredErrors, isLoading: filteredLoading } = AnimeApi.useGetAnimeSearchQuery({ max_score: maxScore.toString(), min_score: minScore.toString(), order_by: 'score', sort: 'desc' });

	return (
		<div className={styles['animegrid']}>
			<div className={styles['animegrid-container']}>
				<h2>Топ 100</h2>
				<div className={styles['animegrid-container__content']}>
					<div className={styles['animegrid-content__items']}>
						{
							filteredData && filteredData.data.map((item: IData, index: number) => (
								<AnimeCard key={index} index={index} item={item} />
							))
						}
					</div>
					<div className={styles['animegrid-content__filter']}>
						<FilterBlock />
					</div>
				</div>
			</div>
		</div>
	)
}

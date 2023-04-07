import { useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/GetAnimeTypes'
import { AnimeCard } from '../../Card'

import { FilterBlock } from '../Filter'

import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {

	const data = useAppSelector(state => state.searchFilter)
	const { data: top100Data, error: top100Errors, isLoading: top100Loading } = AnimeApi.useGetTopAnimeQuery(5);
	const { data: filteredData, error: filteredErrors, isLoading: filteredLoading, refetch } = AnimeApi.useGetAnimeSearchQuery
		({
			max_score: data.maxScore.toString(),
			min_score: data.minScore.toString(),
			start_date: data.dateFrom.toString(),
			end_date: data.dateTo.toString(),
			order_by: 'score',
			sort: 'desc',
		});



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

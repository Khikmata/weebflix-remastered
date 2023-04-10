import { useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/GetAnimeTypes'
import { AnimeCard } from '../../Card'

import { FilterBlock } from '../Filter'

import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {

	const data = useAppSelector(state => state.searchFilter)


	const { data: filteredData, error: filteredErrors, isLoading: filteredLoading } = AnimeApi.useGetAnimeSearchQuery({
		max_score: data.maxScore.toString(),
		min_score: data.minScore.toString(),
		start_date: data.dateFrom.toString(),
		end_date: data.dateTo.toString(),
		order_by: 'score',
		sort: 'desc',
		genres: data.genres,
	});


	return (
		<div className={styles['animegrid']}>
			<div className={styles['animegrid-container']}>
				<h2>Топ 100</h2>
				<div className={styles['animegrid-container__content']}>
					<div className={styles['animegrid-content__items']}>
						{
							filteredLoading && <p>Загрузка даты...</p>
						}
						{
							filteredErrors && <p>Ошибка при загрузке данных</p>
						}
						{
							filteredData && filteredData.map((item: IData, index: number) => (
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

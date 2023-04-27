import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/FetchTypes'
import { AnimeCard } from '../../Card'
import { FilterBlock } from '../Filter'

import { DropDownDataActions } from '../../../store/reducers/DropDownDataSlice'
import styles from './AnimeGridBlock.styles.module.scss'
import { SearchAPI } from '../../../store/services/getSearch'

export const AnimeGridBlock = () => {



	const AddDateToQuery = useAppSelector(state => state.dateFilter)
	const AddScoreToQuery = useAppSelector(state => state.scoreFilter)
	const AddGenreToQuery = useAppSelector(state => state.genreFilter)
	const AddTypeToQuery = useAppSelector(state => state.typeFilter.typeQuery)
	const AddRatingToQuery = useAppSelector(state => state.ratingFilter.ratingQuery)
	const AddSeasonsToQuery = useAppSelector(state => state.seasonsFilter.seasonQuery)
	const AddStudioToQuery = useAppSelector(state => state.studioFilter.producersQuery)
	const AddSearchToQuery = useAppSelector(state => state.searchFilter.searchQuery)


	const { data: filteredData, error: filteredErrors, isLoading: filteredLoading } = SearchAPI.useGetAnimeSearchQuery({
		letter: AddSearchToQuery,
		max_score: AddScoreToQuery.maxScore.toString(),
		min_score: AddScoreToQuery.minScore.toString(),
		start_date: AddDateToQuery.dateFrom.toString(),
		end_date: AddDateToQuery.dateTo.toString(),
		genres: AddGenreToQuery.genresQuery,
		type: AddTypeToQuery,
		rating: AddRatingToQuery,
		producers: AddStudioToQuery,
		order_by: 'score',
		sort: 'desc',
		sfw: (AddRatingToQuery === 'RX' || AddGenreToQuery.genresName.includes('Hentai') ? '' : 'true'),
	});

	const [skip, setSkip] = useState(true)
	const { data: seasonsData } = AnimeApi.useGetAnimeSeasonsQuery('')
	const { data: animeSeasonData } = AnimeApi.useGetAnimeBySeasonQuery(AddSeasonsToQuery, { skip, refetchOnMountOrArgChange: true, })
	const { data: producersData } = AnimeApi.useGetAnimeProducersQuery('', { skip })

	const dispatch = useAppDispatch();

	useEffect(() => {
		seasonsData && setSkip((prevState) => !prevState);
		producersData && dispatch(DropDownDataActions.setProducerData(producersData))
		seasonsData && dispatch(DropDownDataActions.setSeasonData(seasonsData))
	}, [producersData, seasonsData, AddSeasonsToQuery])

	return (
		<div className={styles['animegrid']}>
			<div className={styles['animegrid-container']}>
				<h2>Каталог</h2>
				<div className={styles['animegrid-container__content']}>
					<div className={styles['animegrid-content__items']}>
						{filteredLoading && <p>Загрузка информации...</p>}
						{filteredErrors && <p>Ошибка при загрузке данных</p>}
						{filteredData && AddSeasonsToQuery === '' && filteredData.map((item: IData, index: number) => (
							<AnimeCard key={index} index={index} item={item} />
						))}
						{animeSeasonData && animeSeasonData.map((item: IData, index: number) => (
							<AnimeCard key={index} index={index} item={item} />
						))}
					</div>
					<div className={styles['animegrid-content__filter']}>
						<FilterBlock />
					</div>
				</div>
			</div>
		</div>
	)
}

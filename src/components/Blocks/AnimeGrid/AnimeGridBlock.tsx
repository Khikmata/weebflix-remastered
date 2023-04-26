import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/FetchTypes'
import { AnimeCard } from '../../Card'
import { FilterBlock } from '../Filter'

import { DropDownDataActions } from '../../../store/reducers/DropDownDataSlice'
import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {



	const AddDateToQuery = useAppSelector(state => state.dateFilter)
	const AddScoreToQuery = useAppSelector(state => state.scoreFilter)
	const AddGenreToQuery = useAppSelector(state => state.genreFilter)
	const AddTypeToQuery = useAppSelector(state => state.typeFilter)
	const AddRatingToQuery = useAppSelector(state => state.ratingFilter)
	const AddSeasonsToQuery = useAppSelector(state => state.seasonsFilter)
	const AddStudioToQuery = useAppSelector(state => state.studioFilter)
	const AddSearchToQuery = useAppSelector(state => state.searchFilter)


	const { data: filteredData, error: filteredErrors, isLoading: filteredLoading } = AnimeApi.useGetAnimeSearchQuery({
		letter: AddSearchToQuery.searchQuery,
		max_score: AddScoreToQuery.maxScore.toString(),
		min_score: AddScoreToQuery.minScore.toString(),
		start_date: AddDateToQuery.dateFrom.toString(),
		end_date: AddDateToQuery.dateTo.toString(),
		genres: AddGenreToQuery.genresQuery,
		type: AddTypeToQuery.typeQuery,
		rating: AddRatingToQuery.ratingQuery,
		producers: AddStudioToQuery.producersQuery,
		order_by: 'score',
		sort: 'desc',
		sfw: (AddRatingToQuery.ratingQuery === 'RX' || AddGenreToQuery.genresName.includes('Hentai') ? '' : 'true'),
	});

	const [skip, setSkip] = useState(true)
	const { data: seasonsData } = AnimeApi.useGetAnimeSeasonsQuery('')
	const { data: animeSeasonData } = AnimeApi.useGetAnimeBySeasonQuery(AddSeasonsToQuery.seasonQuery, { skip })
	const { data: producersData } = AnimeApi.useGetAnimeProducersQuery('', { skip })

	const dispatch = useAppDispatch();

	useEffect(() => {
		seasonsData && setSkip((prevState) => !prevState);

		producersData && dispatch(DropDownDataActions.setProducerData(producersData))
		seasonsData && dispatch(DropDownDataActions.setSeasonData(seasonsData))
	}, [producersData, seasonsData])

	return (
		<div className={styles['animegrid']}>
			<div className={styles['animegrid-container']}>
				<h2>Каталог</h2>
				<div className={styles['animegrid-container__content']}>
					<div className={styles['animegrid-content__items']}>
						{filteredLoading && <p>Загрузка информации...</p>}
						{filteredErrors && <p>Ошибка при загрузке данных</p>}
						{filteredData && AddSeasonsToQuery.seasonQuery === '' && filteredData.map((item: IData, index: number) => (
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

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { AnimeApi } from '../../../store/services/getAnime'
import { IData } from '../../../types/FetchTypes'
import { AnimeCard } from '../../UI/Card'
import { FilterBlock } from '../Filter'

import { DropDownDataActions } from '../../../store/reducers/DropDownDataSlice'
import { SearchAPI } from '../../../store/services/getSearch'
import { LoadingComponent } from '../../UI/Loading'
import { Pagination } from '../Pagination'
import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {
  const AddDateToQuery = useAppSelector((state) => state.dateFilter)
  const AddScoreToQuery = useAppSelector((state) => state.scoreFilter)
  const AddGenreToQuery = useAppSelector((state) => state.genreFilter)
  const AddTypeToQuery = useAppSelector((state) => state.typeFilter.typeQuery)
  const AddRatingToQuery = useAppSelector((state) => state.ratingFilter.ratingQuery)
  const AddSeasonsToQuery = useAppSelector((state) => state.seasonsFilter.seasonQuery)
  const AddProducersToQuery = useAppSelector((state) => state.producerFilter.producersQuery)
  const AddSearchToQuery = useAppSelector((state) => state.searchFilter.searchQuery)
  const AddStatusToQuery = useAppSelector((state) => state.statusFilter.statusType)
  const AddSortByToQuery = useAppSelector((state) => state.sortFilter.sortType)
  const AddOrderByToQuery = useAppSelector((state) => state.orderByFilter.orderBy)

  const [pages, setPages] = useState(1)
  const { data: SearchData, error: SearchErrors, isLoading: SearchLoading, } = SearchAPI.useGetAnimeSearchQuery({
    letter: AddSearchToQuery,
    max_score: AddScoreToQuery.maxScore.toString(),
    min_score: AddScoreToQuery.minScore.toString(),
    start_date: AddDateToQuery.dateFrom.toString(),
    end_date: AddDateToQuery.dateTo.toString(),
    genres: AddGenreToQuery.genresQuery,
    type: AddTypeToQuery,
    rating: AddRatingToQuery,
    producers: AddProducersToQuery,
    status: AddStatusToQuery,
    order_by: AddOrderByToQuery,
    sort: AddSortByToQuery,
    limit: 20,
    page: pages,
    sfw: AddRatingToQuery === 'RX' || AddGenreToQuery.genresName.includes('Hentai') ? '' : 'true',
  })

  const paginationData = SearchData?.pagination;

  const [skip, setSkip] = useState(true)
  const { data: seasonsData } = AnimeApi.useGetAnimeSeasonsQuery('')
  const { data: animeSeasonData } = AnimeApi.useGetAnimeBySeasonQuery(AddSeasonsToQuery, { skip })
  const { data: producersData } = AnimeApi.useGetAnimeProducersQuery('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    AddSeasonsToQuery && setSkip((prevState) => !prevState)
    producersData && dispatch(DropDownDataActions.setProducerData(producersData))
    seasonsData && dispatch(DropDownDataActions.setSeasonData(seasonsData))
  }, [producersData, seasonsData, AddSeasonsToQuery, dispatch])

  const handleNextPage = () => {
    setPages(pages === 1 ? pages : pages - 1)
  }
  const handlePrevPage = () => {
    setPages(paginationData?.has_next_page ? pages + 1 : pages)
  }

  return (
    <div className={styles['animegrid']}>
      <div className={styles['animegrid-container']}>
        <h2>Каталог</h2>
        <div className={styles['animegrid-container__content']}>
          <div className={styles['animegrid-content__items']}>
            {SearchLoading && <LoadingComponent />}
            {SearchErrors && <p>Произошла ошибка при загрузке данных </p>}
            {SearchData && AddSeasonsToQuery === '' &&
              SearchData.data.map((item: IData, index: number) => (
                <AnimeCard key={index} index={index} item={item} />
              ))
            }
            {SearchData && SearchData.data.length === 0 && <strong>Ничего не найдено ❌</strong>}
            {animeSeasonData &&
              animeSeasonData.map((item: IData, index: number) => (
                <AnimeCard key={index} index={index} item={item} />
              ))}
          </div>
          <div className={styles['animegrid-content__filter']}>
            <FilterBlock />
          </div>
        </div>
        {SearchData?.data &&
          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            pages={pages}
            hasNextPage={SearchData?.pagination.has_next_page}
          />
        }
      </div>
    </div>
  )
}

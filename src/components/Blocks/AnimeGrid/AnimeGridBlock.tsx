import { Suspense, useEffect, useState } from 'react'

import { IData } from '../../../types/FetchTypes'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { DropDownDataActions } from '../../../store/reducers/DropDownDataSlice'
import { AnimeApi } from '../../../store/services/getAnime'
import { SearchAPI } from '../../../store/services/getSearch'


import { LoadingComponent } from '../../UI/Loading'
import { FilterBlock } from '../Filter'
import { Pagination } from '../Pagination'

import gridIcon from '../../../assets/icons/gridMode.svg'
import listIcon from '../../../assets/icons/listMode.svg'

import { AnimeCard } from '../../UI/AnimeCard'
import styles from './AnimeGridBlock.styles.module.scss'

export const AnimeGridBlock = () => {

  const { ...filterQueries } = useAppSelector((state) => state.filters)

  const AddDateToQuery = filterQueries.dateFilterReducer;
  const AddGenreToQuery = filterQueries.genreFilterReducer;
  const AddScoreToQuery = filterQueries.scoreFilterReducer;
  const AddTypeToQuery = filterQueries.typeFilterReducer.typeQuery;
  const AddRatingToQuery = filterQueries.ratingFilterReducer.ratingQuery;
  const AddSeasonsToQuery = filterQueries.seasonFilterReducer.seasonQuery;
  const AddProducersToQuery = filterQueries.producersFilterReducer.producersQuery;
  const AddSearchToQuery = filterQueries.searchFilterReducer.searchQuery;
  const AddStatusToQuery = filterQueries.statusFilterReducer.statusType;
  const AddSortByToQuery = filterQueries.sortFilterReducer.sortType;
  const AddOrderByToQuery = filterQueries.orderByFilterReducer.orderBy;

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

  const [activeDisplayMode, setActiveDisplayMode] = useState(0)

  const dispatch = useAppDispatch()
  useEffect(() => {
    AddSeasonsToQuery && setSkip((prevState) => !prevState)
    producersData && dispatch(DropDownDataActions.setProducerData(producersData))
    seasonsData && dispatch(DropDownDataActions.setSeasonData(seasonsData))
  }, [producersData, seasonsData, AddSeasonsToQuery, dispatch])

  const handlePrevPage = () => {
    setPages(pages === 1 ? pages : pages - 1)
  }

  const handleNextPage = () => {
    setPages(paginationData?.has_next_page ? pages + 1 : pages)
  }

  const handleDisplayMode = (index: number) => {
    setActiveDisplayMode(index)
  }


  return (
    <div className={styles['animegrid']}>
      <div className={styles['animegrid-container']}>
        <div className={styles['animegrid-header']}>
          <h2>
            Каталог
          </h2>
          <div className={styles['animegrid-container__mode']}>
            <button className={styles[activeDisplayMode === 0 ? 'active' : '']} onClick={() => handleDisplayMode(0)}>
              <img src={gridIcon} width={22} alt='Сеточная' />
            </button>
            <button className={styles[activeDisplayMode === 1 ? 'active' : '']} onClick={() => handleDisplayMode(1)}>
              <img src={listIcon} width={24} alt='Таблицей' />
            </button>
          </div>
        </div>
        <div className={styles['animegrid-container__content']}>
          <div className={[styles['animegrid-content__items'], styles[activeDisplayMode === 0 ? '' : 'list']].join('')}>
            {SearchLoading && <LoadingComponent />}
            {SearchErrors && <p>Произошла ошибка при загрузке данных </p>}
            {SearchData && AddSeasonsToQuery === '' &&
              SearchData.data.map((item: IData, index: number) => (
                <Suspense fallback={<LoadingComponent />}>
                  <AnimeCard mode={activeDisplayMode} key={index} index={index} item={item} />
                </Suspense>

              ))
            }
            {SearchData && SearchData.data.length === 0 && AddSeasonsToQuery === '' && <strong>Ничего не найдено ❌</strong>}

            {animeSeasonData &&
              animeSeasonData.map((item: IData, index: number) => (
                <Suspense fallback={<LoadingComponent />}>
                  <AnimeCard mode={activeDisplayMode} key={index} index={index} item={item} />
                </Suspense>
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

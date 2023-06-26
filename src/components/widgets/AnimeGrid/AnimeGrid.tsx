import React, { Suspense, useEffect, useState } from 'react'

import { Pagination } from '@components/features'
import { AnimeCard, Loading } from '@components/shared'
import { DropdownDataActions } from '@store/reducers/Dropdown/DropdownDataSlice'
import { AnimeApi } from '@store/services'

import { AnimeGridWrapper } from '@components/shared/AnimeGridWrapper/AnimeGridWrapper'
import { getAnimeData } from '@store/services/getAnimeData'
import { SearchAPI } from '@store/services/getSearch'
import { IData } from '@store/types/FetchTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { ErrorBoundary } from 'react-error-boundary'
import { SearchFilters } from '../SearchFilters/SearchFilters'
import styles from './AnimeGrid.styles.module.scss'

export const AnimeGrid = () => {
  const dispatch = useAppDispatch()

  const { ...filterQueries } = useAppSelector((state) => state.filterReducer)

  const AddDateToParams = filterQueries.dateFilters
  const AddGenreToParams = filterQueries.genreFilters
  const AddScoreToParams = filterQueries.scoreFilters
  const AddTypeToParams = filterQueries.typeFilters.typeQuery
  const AddRatingToParams = filterQueries.ratingFilters.ratingQuery
  const AddSeasonsToParams = filterQueries.seasonFilters.seasonQuery
  const AddProducersToParams = filterQueries.producerFilters.producersQuery
  const AddSearchToParams = filterQueries.searchFilters.searchQuery
  const AddStatusToParams = filterQueries.statusFilters.statusType
  const AddSortByToParams = filterQueries.sortFilters.sortType
  const AddOrderByToParams = filterQueries.orderFilters.orderBy

  const [pages, setPages] = useState(1)

  const {
    data: SearchData,
    error: SearchErrors,
    isLoading: SearchLoading,
  } = SearchAPI.useGetAnimeBySearchQuery({
    q: AddSearchToParams,
    max_score: AddScoreToParams.maxScore.toString(),
    min_score: AddScoreToParams.minScore.toString(),
    start_date: AddDateToParams.dateFrom.toString(),
    end_date: AddDateToParams.dateTo.toString(),
    genres: AddGenreToParams.selectedGenresIndexes,
    type: AddTypeToParams,
    rating: AddRatingToParams,
    producers: AddProducersToParams,
    status: AddStatusToParams,
    order_by: AddOrderByToParams.value,
    sort: AddSortByToParams,
    limit: 20,
    page: pages,
    sfw:
      AddRatingToParams === 'RX' ||
      AddGenreToParams.selectedGenresNames.includes('Hentai')
        ? ''
        : 'true',
  })

  const { data: seasonsData } = getAnimeData.useGetAnimeSeasonsQuery()
  const { data: producersData } = getAnimeData.useGetAnimeProducersQuery()
  const paginationData = SearchData?.pagination

  const [trigger, { data: animeSeasonData }] =
    AnimeApi.useLazyGetAnimeBySeasonQuery()

  const activeLayout = useAppSelector((state) => state.catalogue.activeLayout)

  const handlePrevPage = () => {
    setPages(pages === 1 ? pages : pages - 1)
  }

  const handleNextPage = () => {
    setPages(paginationData?.has_next_page ? pages + 1 : pages)
  }

  useEffect(() => {
    producersData &&
      dispatch(DropdownDataActions.setProducerData(producersData))

    if (seasonsData) {
      dispatch(DropdownDataActions.setSeasonData(seasonsData))
    }
    if (AddSeasonsToParams) {
      trigger(AddSeasonsToParams)
    }
  }, [
    producersData,
    seasonsData,
    AddSeasonsToParams,
    SearchData,
    dispatch,
    trigger,
  ])

  const MemoizedAnimeCard = React.memo(({ item }: { item: IData }) => (
    <ErrorBoundary fallback={<p>Ошибка при загрузке карточки</p>}>
      <AnimeCard item={item} />
    </ErrorBoundary>
  ))

  return (
    <>
      <AnimeGridWrapper title={'catalogue_title'}>
        <div className={styles['animegrid-container__content']}>
          <div
            className={[
              styles['animegrid-content__items'],
              styles[activeLayout === 'list' ? 'list' : ''],
            ].join('')}
          >
            {SearchErrors && <p>Произошла ошибка при загрузке данных </p>}
            {SearchLoading && <Loading />}
            {SearchData?.data &&
              AddSeasonsToParams === null &&
              SearchData?.data.map((item: IData) => (
                <Suspense key={item.mal_id} fallback={<Loading />}>
                  <MemoizedAnimeCard item={item} />
                </Suspense>
              ))}
            {seasonsData &&
              SearchData &&
              SearchData.data.length === 0 &&
              AddSeasonsToParams === '' && (
                <strong>Ничего не найдено ❌</strong>
              )}
            {animeSeasonData &&
              animeSeasonData.map((item: IData) => (
                <Suspense key={item.mal_id} fallback={<Loading />}>
                  <MemoizedAnimeCard item={item} />
                </Suspense>
              ))}
          </div>
          <SearchFilters />
        </div>
        {SearchData && (
          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            pages={pages}
            hasNextPage={SearchData.pagination.has_next_page}
          />
        )}
      </AnimeGridWrapper>
    </>
  )
}

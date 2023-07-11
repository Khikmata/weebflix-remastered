import React, { Suspense, memo, useEffect, useState } from 'react'

import { Pagination } from '@components/features'
import { AnimeCard, Loading } from '@components/shared'
import { DropdownDataActions } from '@store/reducers/Dropdown/DropdownDataSlice'
import { AnimeApi, AnimeDataApi } from '@store/services'

import { AnimeGridWrapper } from '@components/shared/AnimeGridWrapper/AnimeGridWrapper'
import { CatalogueLayoutType } from '@store/reducers/Catalogue/types'
import { dateFilterActions } from '@store/reducers/Filters'
import { sortFilterActions } from '@store/reducers/Filters/SortFilterSlice'
import { SearchAPI } from '@store/services/SearchApi'
import { IData } from '@store/types/FetchTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { ErrorBoundary } from 'react-error-boundary'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SearchFilters } from '../SearchFilters/SearchFilters'
import styles from './AnimeGrid.styles.module.scss'

export const AnimeGrid = memo(({ title }: { title: string }) => {
  const dispatch = useAppDispatch()

  const {
    dateFilters,
    genreFilters,
    scoreFilters,
    typeFilters,
    ratingFilters,
    seasonFilters,
    producerFilters,
    searchFilters,
    statusFilters,
    sortFilters,
    orderFilters,
  } = useAppSelector((state) => state.filter)

  const [pages, setPages] = useState(1)

  const {
    data: SearchData,
    error: SearchDataErrors,
    isLoading: SearchDataLoading,
  } = SearchAPI.useGetAnimeBySearchQuery({
    q: searchFilters.searchQuery,
    max_score: scoreFilters.maxScore.toString(),
    min_score: scoreFilters.minScore.toString(),
    start_date: dateFilters.dateFrom.toString(),
    end_date: dateFilters.dateTo.toString(),
    genres: genreFilters.selectedGenresIndexes,
    type: typeFilters.typeQuery,
    rating: ratingFilters.ratingQuery,
    producers: producerFilters.producersQuery,
    status: statusFilters.statusType,
    order_by: orderFilters.orderBy.value,
    sort: sortFilters.sortType,
    limit: 20,
    page: pages,
    sfw:
      ratingFilters.ratingQuery === 'RX' ||
      genreFilters.selectedGenresNames.includes('Hentai')
        ? ''
        : 'true',
  })

  const { data: seasons } = AnimeDataApi.useGetAnimeSeasonsQuery()
  const { data: SeasonData, isLoading: SeasonDataLoading } =
    AnimeApi.useGetAnimeBySeasonQuery(
      { seasonQuery: seasonFilters.seasonQuery, page: pages },
      { skip: seasonFilters.seasonQuery === '' },
    )
  const { data: producersData } = AnimeDataApi.useGetAnimeProducersQuery()

  const paginationData = SearchData?.pagination

  const activeLayout = useAppSelector((state) => state.catalogue.activeLayout)

  const handlePrevPage = () => {
    setPages(pages === 1 ? pages : pages - 1)
  }

  const handleNextPage = () => {
    setPages(paginationData?.has_next_page ? pages + 1 : pages)
  }

  const handleClearFilters = () => {
    dispatch(dateFilterActions.setDateFrom(1980))
    dispatch(dateFilterActions.setDateTo(2023))
    dispatch(sortFilterActions.setSortType('desc'))
  }

  useEffect(() => {
    if (producersData) {
      dispatch(DropdownDataActions.setProducerData(producersData))
    }
    if (seasons) {
      dispatch(DropdownDataActions.setSeasonData(seasons))
    }
  }, [producersData, seasons, SearchData, dispatch, seasonFilters.seasonQuery])

  return (
    <>
      <AnimeGridWrapper title={title}>
        <div className={styles['animegrid-container__content']}>
          <div
            className={[
              styles['animegrid-content__items'],
              styles[activeLayout === 'list' ? 'list' : ''],
            ].join('')}
          >
            {SearchDataErrors && <p>Произошла ошибка при загрузке данных </p>}
            {seasonFilters.seasonQuery === ''
              ? SearchData?.data?.map((item: IData) => (
                  <MemoizedAnimeCard
                    key={item.mal_id}
                    item={item}
                    activeLayout={activeLayout}
                  />
                ))
              : SeasonData?.map((item: IData) => (
                  <Suspense key={item.mal_id} fallback={<Loading />}>
                    <MemoizedAnimeCard
                      item={item}
                      activeLayout={activeLayout}
                    />
                  </Suspense>
                ))}
            {(SeasonDataLoading || SearchDataLoading) &&
              Array.from({ length: 20 }).map((_, index) => (
                <div className="animecard" key={index}>
                  <Skeleton
                    count={1}
                    baseColor="gray"
                    className={styles['skeleton']}
                  />
                  <Skeleton
                    count={1}
                    baseColor="gray"
                    className={styles['skeleton__title']}
                  />
                </div>
              ))}
            {SeasonData &&
              !SeasonDataLoading &&
              seasonFilters.seasonQuery === '' && (
                <strong>Ничего не найдено ❌</strong>
              )}
            {SearchData &&
              !SearchDataLoading &&
              seasonFilters.seasonQuery !== '' && (
                <strong>Ничего не найдено ❌</strong>
              )}
          </div>
          <SearchFilters clearFilters={handleClearFilters} />
        </div>

        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          pages={pages}
          hasNextPage={SearchData?.pagination.has_next_page}
        />
      </AnimeGridWrapper>
    </>
  )
})

const MemoizedAnimeCard = React.memo(
  ({
    activeLayout,
    item,
  }: {
    activeLayout?: CatalogueLayoutType
    item: IData
  }) => (
    <ErrorBoundary fallback={<p>Ошибка при загрузке карточки</p>}>
      <AnimeCard item={item} activeLayout={activeLayout} />
    </ErrorBoundary>
  ),
)

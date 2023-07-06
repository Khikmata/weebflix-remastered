import React, { Suspense, memo, useEffect, useState } from 'react'

import { Pagination } from '@components/features'
import { AnimeCard, Loading } from '@components/shared'
import { DropdownDataActions } from '@store/reducers/Dropdown/DropdownDataSlice'
import { AnimeApi } from '@store/services'

import { AnimeGridWrapper } from '@components/shared/AnimeGridWrapper/AnimeGridWrapper'
import { CatalogueLayoutType } from '@store/reducers/Catalogue/types'
import { getAnimeData } from '@store/services/getAnimeData'
import { SearchAPI } from '@store/services/getSearch'
import { IData } from '@store/types/FetchTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { ErrorBoundary } from 'react-error-boundary'
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
  } = useAppSelector((state) => state.filterReducer)

  const [pages, setPages] = useState(1)

  const {
    data: SearchData,
    error: SearchErrors,
    isLoading: SearchLoading,
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

  const { data: seasonsData } = getAnimeData.useGetAnimeSeasonsQuery()
  const { data: animeSeasonData } = AnimeApi.useGetAnimeBySeasonQuery(
    searchFilters.searchQuery,
    { skip: seasonFilters.seasonQuery === '' },
  )
  const { data: producersData } = getAnimeData.useGetAnimeProducersQuery()

  const paginationData = SearchData?.pagination

  const activeLayout = useAppSelector((state) => state.catalogue.activeLayout)

  const handlePrevPage = () => {
    setPages(pages === 1 ? pages : pages - 1)
  }

  const handleNextPage = () => {
    setPages(paginationData?.has_next_page ? pages + 1 : pages)
  }

  useEffect(() => {
    if (producersData) {
      dispatch(DropdownDataActions.setProducerData(producersData))
    }
    if (seasonsData) {
      dispatch(DropdownDataActions.setSeasonData(seasonsData))
    }
  }, [
    producersData,
    seasonsData,
    SearchData,
    dispatch,
    seasonFilters.seasonQuery,
  ])

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
            {SearchErrors && <p>Произошла ошибка при загрузке данных </p>}
            {SearchLoading && <Loading />}
            {seasonFilters.seasonQuery === '' &&
              SearchData?.data?.map((item: IData) => (
                <Suspense key={item.mal_id} fallback={<Loading />}>
                  <MemoizedAnimeCard item={item} activeLayout={activeLayout} />
                </Suspense>
              ))}
            {seasonsData &&
              SearchData?.data.length === 0 &&
              seasonFilters.seasonQuery === '' && (
                <strong>Ничего не найдено ❌</strong>
              )}
            {animeSeasonData?.map((item: IData) => (
              <Suspense key={item.mal_id} fallback={<Loading />}>
                <MemoizedAnimeCard item={item} activeLayout={activeLayout} />
              </Suspense>
            ))}
          </div>
          <SearchFilters />
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

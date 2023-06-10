import { Suspense, useEffect, useState } from 'react';

import gridIcon from '@assets/icons/GridIcon.svg';
import listIcon from '@assets/icons/ListIcon.svg';

import styles from './AnimeGridBlock.styles.module.scss';
import { LoadingComponent, AnimeCard } from '@components/shared';
import { DropdownDataActions } from '@store/reducers/Dropdown/DropdownDataSlice';
import { AnimeApi } from '@store/services';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IData } from 'types/FetchTypes';
import { Pagination } from '@components/features';
import { SearchAPI } from '@store/services/getSearch';
import { FilterBlock } from '../FilterBlock/FilterBlock';

export const AnimeGridBlock = () => {
  const dispatch = useAppDispatch();

  const { ...filterQueries } = useAppSelector((state) => state.filterReducer);

  const AddDateToParams = filterQueries.dateFilters;
  const AddGenreToParams = filterQueries.genreFilters;
  const AddScoreToParams = filterQueries.scoreFilters;
  const AddTypeToParams = filterQueries.typeFilters.typeQuery;
  const AddRatingToParams = filterQueries.ratingFilters.ratingQuery;
  const AddSeasonsToParams = filterQueries.seasonFilters.seasonQuery;
  const AddProducersToParams = filterQueries.producerFilters.producersQuery;
  const AddSearchToParams = filterQueries.searchFilters.searchQuery;
  const AddStatusToParams = filterQueries.statusFilters.statusType;
  const AddSortByToParams = filterQueries.sortFilters.sortType;
  const AddOrderByToParams = filterQueries.orderFilters.orderBy;

  const [pages, setPages] = useState(1);

  const {
    data: SearchData,
    error: SearchErrors,
    isLoading: SearchLoading,
  } = SearchAPI.useGetAnimeBySearchQuery({
    letter: AddSearchToParams,
    max_score: AddScoreToParams.maxScore.toString(),
    min_score: AddScoreToParams.minScore.toString(),
    start_date: AddDateToParams.dateFrom.toString(),
    end_date: AddDateToParams.dateTo.toString(),
    genres: AddGenreToParams.genresQuery,
    type: AddTypeToParams,
    rating: AddRatingToParams,
    producers: AddProducersToParams,
    status: AddStatusToParams,
    order_by: AddOrderByToParams,
    sort: AddSortByToParams,
    limit: 20,
    page: pages,
    sfw:
      AddRatingToParams === 'RX' ||
      AddGenreToParams.genresName.includes('Hentai')
        ? ''
        : 'true',
  });
  const { data: seasonsData } = AnimeApi.useGetAnimeSeasonsQuery();
  const { data: producersData } = AnimeApi.useGetAnimeProducersQuery();
  const paginationData = SearchData?.pagination;

  const [trigger, { data: animeSeasonData }] =
    AnimeApi.useLazyGetAnimeBySeasonQuery();

  const [activeDisplayMode, setActiveDisplayMode] = useState(0);

  const handlePrevPage = () => {
    setPages(pages === 1 ? pages : pages - 1);
  };

  const handleNextPage = () => {
    setPages(paginationData?.has_next_page ? pages + 1 : pages);
  };

  const handleDisplayMode = (index: number) => {
    setActiveDisplayMode(index);
  };

  useEffect(() => {
    producersData &&
      dispatch(DropdownDataActions.setProducerData(producersData));

    if (seasonsData) {
      dispatch(DropdownDataActions.setSeasonData(seasonsData));
    }
    if (AddSeasonsToParams) {
      trigger(AddSeasonsToParams);
    }
  }, [producersData, seasonsData, AddSeasonsToParams]);

  return (
    <div className={styles['animegrid']}>
      <div className={styles['animegrid-container']}>
        <div className={styles['animegrid-header']}>
          <h2>Каталог</h2>
          <div className={styles['animegrid-container__mode']}>
            <button
              className={styles[activeDisplayMode === 0 ? 'active' : '']}
              onClick={() => handleDisplayMode(0)}
            >
              <img src={gridIcon} width={22} alt="Сеточная" />
            </button>
            <button
              className={styles[activeDisplayMode === 1 ? 'active' : '']}
              onClick={() => handleDisplayMode(1)}
            >
              <img src={listIcon} width={24} alt="Таблицей" />
            </button>
          </div>
        </div>
        <div className={styles['animegrid-container__content']}>
          <div
            className={[
              styles['animegrid-content__items'],
              styles[activeDisplayMode === 0 ? '' : 'list'],
            ].join('')}
          >
            {SearchLoading && <LoadingComponent />}
            {SearchErrors && <p>Произошла ошибка при загрузке данных </p>}
            {SearchData &&
              AddSeasonsToParams === '' &&
              SearchData.data.map((item: IData, index: number) => (
                <Suspense key={index} fallback={<LoadingComponent />}>
                  <AnimeCard
                    mode={activeDisplayMode}
                    index={index}
                    item={item}
                  />
                </Suspense>
              ))}
            {SearchData &&
              SearchData.data.length === 0 &&
              AddSeasonsToParams === '' && (
                <strong>Ничего не найдено ❌</strong>
              )}

            {animeSeasonData &&
              animeSeasonData.map((item: IData, index: number) => (
                <Suspense key={index} fallback={<LoadingComponent />}>
                  <AnimeCard
                    mode={activeDisplayMode}
                    index={index}
                    item={item}
                  />
                </Suspense>
              ))}
          </div>
          <div className={styles['animegrid-content__filter']}>
            <FilterBlock />
          </div>
        </div>
        {SearchData?.data && (
          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            pages={pages}
            hasNextPage={SearchData?.pagination.has_next_page}
          />
        )}
      </div>
    </div>
  );
};

import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'
import { ReactComponent as FilterIcon } from '@assets/icons/FiltersIcon.svg'
import { FilterDropdown } from '@components/features/FilterDropdown/FilterDropdown'
import { Button, RangeInput } from '@components/shared'
import { DropdownDataActions } from '@store/reducers/Dropdown/DropdownDataSlice'
import { dateFilterActions, scoreFilterActions } from '@store/reducers/Filters'
import { AnimeDataApi } from '@store/services/AnimeDataApi'
import { useAnimate } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SearchFilters.styles.module.scss'

interface searchFilterProps {
  clearFilters: () => void
}

export const SearchFilters = memo(({ clearFilters }: searchFilterProps) => {
  const { data: genresData } = AnimeDataApi.useGetAnimeGenresQuery()

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [openFilters, setOpenFilters] = useState(false)
  const [scope, animate] = useAnimate()

  const isUserMobile = useAppSelector((state) => state.mobile.isUserMobile)

  useEffect(() => {
    genresData && dispatch(DropdownDataActions.setGenreData(genresData))
  }, [genresData, dispatch])

  useEffect(() => {
    if (!isUserMobile) {
      setOpenFilters(true)
    }
  }, [])

  const handleFiltersDropdown = () => {
    setOpenFilters(!openFilters)
    if (openFilters) {
      animate(scope.current, { opacity: 0 }, { duration: 0.1 })
    } else {
      animate(scope.current, { opacity: 1 }, { duration: 0.1 })
    }
  }

  const handleScoreChange = (values: number[]) => {
    dispatch(scoreFilterActions.setMinScore(values[0]))
    dispatch(scoreFilterActions.setMaxScore(values[1]))
  }

  const handleDateChange = (values: number[]) => {
    dispatch(dateFilterActions.setDateFrom(values[0]))
    dispatch(dateFilterActions.setDateTo(values[1]))
  }

  return (
    <div className={styles['searchFilters']}>
      <div
        className={[
          styles['filters-top'],
          styles[isUserMobile ? 'mobile' : ''],
        ].join(' ')}
      >
        <button
          onClick={handleFiltersDropdown}
          className={styles['searchFilters-title']}
        >
          <FilterIcon />
          {t('searchFilters_title')}
        </button>
        {/* TODO: ERASE FILTERS
         <div className={styles['filters-erase']}>
          <button onClick={clearFilters}>
            <EraseIcon />
          </button>
        </div> */}
      </div>

      <div
        className={[
          styles['searchFilters-content'],
          styles[openFilters ? 'active' : ''],
          styles[isUserMobile ? '' : ''],
        ].join(' ')}
        ref={scope}
      >
        <RangeInput
          min={0}
          max={10}
          step={1}
          title={'Сортировка по оценке:'}
          handleRange={handleScoreChange}
        />
        <RangeInput
          showMiles={false}
          min={1980}
          max={2023}
          step={1}
          title={'Сортировка по дате:'}
          handleRange={handleDateChange}
        />
        <FilterDropdown />
        {/* {isUserMobile && (
          <div className={styles['mobile-close']}>
            <Button
              onClick={handleFiltersDropdown}
              contentPadding="4px 8px"
              color="secondary"
            >
              <CloseIcon />
            </Button>
          </div>
        )} */}
      </div>
    </div>
  )
})

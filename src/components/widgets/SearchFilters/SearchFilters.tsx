import dropdownIcon from '@assets/icons/DropdownIcon.svg'
import filterIcon from '@assets/icons/FiltersIcon.svg'

import styles from './SearchFilters.styles.module.scss'

import { FilterDropdown } from '@components/features/FilterDropdown/FilterDropdown'
import { RangeInput } from '@components/shared'
import { DropdownDataActions } from '@store/reducers/Dropdown/DropdownDataSlice'
import { dateFilterActions, scoreFilterActions } from '@store/reducers/Filters'
import { getAnimeData } from '@store/services/getAnimeData'
import { useAnimate } from 'framer-motion'
import { useAppDispatch } from 'hooks/redux'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const SearchFilters = memo(() => {
  const { data: genresData } = getAnimeData.useGetAnimeGenresQuery()

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [scope, animate] = useAnimate()
  useEffect(() => {
    genresData && dispatch(DropdownDataActions.setGenreData(genresData))
  }, [genresData, dispatch])

  const [openFilters, setOpenFilters] = useState(true)

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
      <button
        onClick={handleFiltersDropdown}
        className={styles['searchFilters-title']}
      >
        <img width={16} src={filterIcon} alt="Фильтр картинка" />
        {t('searchFilters_title')}
        <img
          className={styles['searchFilters-title__dropdown']}
          src={dropdownIcon}
          width={12}
          alt="Выпадающее меню"
        ></img>
      </button>
      <div
        className={[
          styles['searchFilters-content'],
          styles[openFilters ? 'active' : ''],
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
      </div>
    </div>
  )
})

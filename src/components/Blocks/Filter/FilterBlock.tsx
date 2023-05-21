import dropdownIcon from '../../../assets/icons/dropdown.svg'
import filterIcon from '../../../assets/icons/filters.svg'

import { useAppDispatch } from '../../../hooks/redux'
import { DropdownDataActions } from '../../../store/reducers/DropdownDataSlice'
import { dateFilterActions } from '../../../store/reducers/Filters/DateFilterSlice'
import { scoreFilterActions } from '../../../store/reducers/Filters/ScoreFilterSlice'

import { AnimeApi } from '../../../store/services/getAnime'
import { SelectComponent } from '../../Select'
import { RangeComponent } from '../../UI/Range'
import styles from './FilterBlock.styles.module.scss'

import { useEffect, useState } from 'react'

export const FilterBlock = () => {
  const { data: genresData } = AnimeApi.useGetAnimeGenresQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    genresData && dispatch(DropdownDataActions.setGenreData(genresData))
  }, [genresData, dispatch])

  const [openFilters, setOpenFilters] = useState(true)

  const handleFiltersDropdown = () => {
    setOpenFilters(!openFilters)
  }

  const handleScoreChange = (values: number[]) => {
    dispatch(scoreFilterActions.setMinScore(values[0]))
    dispatch(scoreFilterActions.setMaxScore(values[1]))
  }

  const handleDateChange = (values: number[]) => {
    dispatch(dateFilterActions.setDateFrom(values[0]))
    dispatch(dateFilterActions.setDateTo(values[1]))
  }

  const selectTitle = [
    'Жанры',
    'Тип',
    'Рейтинг',
    'Сезон',
    'Студия',
    'Статус',
    'Отсортровать:',
    'Упорядочить:',
  ]
  const selectTooltip = [
    'Cортировать по жанрам',
    'Сортировать по типам',
    'Сортировать по рейтингу',
    'Сортировать по сезонам',
    'Сортировать по студии',
    'Сортировать по статусу',
    'Сортировать по оценке, Сортировать по рейтингу',
  ]
  const SelectDropdownType = [
    'genres',
    'types',
    'rating',
    'season',
    'producer',
    'status',
    'sort',
    'order',
  ]

  return (
    <>
      <button onClick={handleFiltersDropdown} className={styles['filter-title']}>
        <img width={16} src={filterIcon} alt="Фильтр картинка" />
        Фильтр
        <img
          className={styles['filter-title__dropdown']}
          src={dropdownIcon}
          width={12}
          alt="Выпадающее меню"
        ></img>
      </button>
      <div className={[styles['filterblock'], styles[openFilters ? 'active' : '']].join(' ')}>
        <RangeComponent
          min={0}
          max={10}
          step={1}
          title={'Сортировка по рейтингу:'}
          handleRange={handleScoreChange}
        />
        <RangeComponent
          showMiles={false}
          min={1960}
          max={2023}
          step={1}
          title={'Сортировка по дате:'}
          handleRange={handleDateChange}
        />
        {selectTitle.map((_, index) => (
          <SelectComponent
            key={index}
            title={selectTitle[index]}
            tooltip={selectTooltip[index]}
            dropdownType={SelectDropdownType[index]}
          />
        ))}
      </div>
    </>
  )
}

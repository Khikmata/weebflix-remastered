import { useCallback, useMemo, useState } from 'react'

import Dropdown from 'assets/icons/DropdownIcon.svg'
import styles from './SelectComponent.styles.module.scss'

import { useAppSelector } from 'hooks/redux'
import { DropdownTypeEnum } from 'utils/DataTypes/AnimeData'
import { SelectDropdown } from './SelectDropdown'

interface SelectComponentProps {
  title: string
  tooltip: string
  dropdownType: string
}

export const Select: React.FC<SelectComponentProps> = ({ title, tooltip, dropdownType }) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const { ...filterDisplays } = useAppSelector((state) => state.filterReducer)

  const { year: seasonYear, season: seasonSeason } = useAppSelector((state) => state.filterReducer.seasonFilters)

  //tooltips for inputs
  const genreDisplay = filterDisplays.genreFilters.selectedGenresNames
  const typesDisplay = filterDisplays.typeFilters.typeDisplay
  const ratingDisplay = filterDisplays.ratingFilters.ratingDisplay
  const producersDisplay = filterDisplays.producerFilters.producersDisplay
  const seasonDisplay = seasonYear && seasonSeason && seasonYear + seasonSeason
  const statusDisplay = filterDisplays.statusFilters.statusType
  const sortDisplay = filterDisplays.sortFilters.sortType
  const orderDisplay = filterDisplays.orderFilters.orderBy.value

  //Перенаправление конкретных селектов для отображения
  const displayHandler = useMemo(() => {
    if (dropdownType === DropdownTypeEnum.GENRES) {
      return genreDisplay.length !== 0 ? genreDisplay.join(', ') : tooltip
    }
    if (dropdownType === DropdownTypeEnum.TYPES) {
      return typesDisplay ? genreDisplay : tooltip
    }
    if (dropdownType === DropdownTypeEnum.RATING) {
      return ratingDisplay ? genreDisplay : tooltip
    }
    if (dropdownType === DropdownTypeEnum.SEASON) {
      return seasonDisplay ? genreDisplay : tooltip
    }
    if (dropdownType === DropdownTypeEnum.PRODUCER) {
      return producersDisplay ? genreDisplay : tooltip
    }
    if (dropdownType === DropdownTypeEnum.STATUS) {
      return statusDisplay ? genreDisplay : tooltip
    }
    if (dropdownType === DropdownTypeEnum.SORT) {
      return sortDisplay
    }
    if (dropdownType === DropdownTypeEnum.ORDER) {
      return orderDisplay
    }
  }, [
    dropdownType,
    genreDisplay,
    producersDisplay,
    ratingDisplay,
    seasonDisplay,
    tooltip,
    typesDisplay,
    statusDisplay,
    sortDisplay,
    orderDisplay,
  ])

  const handleDropdown = useCallback(() => {
    setOpenDropdown((prevState) => !prevState)
  }, [])

  return (
    <div className={styles['selectComponent']}>
      <p>{title}</p>
      <button onClick={handleDropdown} className={styles['selectComponent-container']}>
        <p>{displayHandler}</p>
        <img src={Dropdown} width={12} alt="Выпадающее меню" />
      </button>
      <div className={[styles['selectComponent-dropdown'], styles[openDropdown ? 'active' : '']].join(' ')}>
        <ul className={styles['dropdown-list']}>{<SelectDropdown dropdownType={dropdownType} />}</ul>
      </div>
    </div>
  )
}

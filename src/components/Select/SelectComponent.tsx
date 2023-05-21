import { useCallback, useMemo, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'

import Dropdown from '../../assets/icons/dropdown.svg'
import styles from './SelectComponent.styles.module.scss'

import { DropdownTypeEnum } from '../../utils/DataTypes/AnimeData'

import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres'
import { TranslateRatingToRussian } from '../../utils/Translation/TranslateRating'
import { TranslateSeasonToRussian } from '../../utils/Translation/TranslateRelease'
import { TranslateTypeToRussian } from '../../utils/Translation/TranslateTypes'

import { TranslateOrderToRussian } from '../../utils/Translation/TranslateOrder'
import { TranslateSortToRussian } from '../../utils/Translation/TranslateSort'
import { TranslateStatusToRussian } from '../../utils/Translation/TranslateStatus'
import { SelectDropdown } from './SelectDropdown'

interface SelectComponentProps {
  title: string
  tooltip: string
  dropdownType: string
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  title,
  tooltip,
  dropdownType,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const { ...filterDisplays } = useAppSelector((state) => state.filters)

  const { year: seasonYear, season: seasonSeason } = useAppSelector((state) => state.filters.seasonFilterReducer)

  //tooltips for inputs
  const genreDisplay = filterDisplays.genreFilterReducer.genresName
  const typesDisplay = filterDisplays.typeFilterReducer.typeDisplay
  const ratingDisplay = filterDisplays.ratingFilterReducer.ratingDisplay
  const producersDisplay = filterDisplays.producersFilterReducer.producersDisplay
  const seasonDisplay = `${seasonYear} ` + TranslateSeasonToRussian(seasonSeason)
  const statusDisplay = filterDisplays.statusFilterReducer.statusType
  const sortDisplay = filterDisplays.sortFilterReducer.sortType
  const orderDisplay = filterDisplays.orderByFilterReducer.orderBy

  //Отображение выбранных нами параметров и их перевод
  const GetTooltipDisplay = useCallback(
    (display: string[] | string | null, translateTo?: (display: string) => void) => {
      let result = ''
      if (display !== null && display.length !== 0) {
        //если текст для дисплея не нужно переводить, то возвращаем оригинальный дисплей
        if (!translateTo) {
          return (result += display)
        }
        //Дисплей переводится, для дисплея жанров добавляется ',' для перечисления
        for (let i = 0; i < display.length; i++) {
          translateTo &&
            (result += `${translateTo(display[i])}${display === genreDisplay ? ', ' : ''}`)
        }
        //Если никакой из вариантов не выбран, получаем исходный тултип
        if (result === ' ') {
          return tooltip
        }
        //возвращаем результат дисплея (с/без) перевод(ом/а)
        return result
      }
      return tooltip
    },
    [genreDisplay, tooltip],
  )

  //Перенаправление конкретных селектов для отображения
  const displayHandler = useMemo(() => {
    if (dropdownType === DropdownTypeEnum.GENRES) {
      return GetTooltipDisplay(genreDisplay, TranslateGenresToRussian)
    }
    if (dropdownType === DropdownTypeEnum.TYPES) {
      return typesDisplay ? TranslateTypeToRussian(typesDisplay) : tooltip
    }
    if (dropdownType === DropdownTypeEnum.RATING) {
      return ratingDisplay ? TranslateRatingToRussian(ratingDisplay) : tooltip
    }
    if (dropdownType === DropdownTypeEnum.SEASON) {
      return seasonDisplay === ' ' ? tooltip : seasonDisplay
    }
    if (dropdownType === DropdownTypeEnum.PRODUCER) {
      return GetTooltipDisplay(producersDisplay)
    }
    if (dropdownType === DropdownTypeEnum.STATUS) {
      return statusDisplay === ''
        ? tooltip
        : TranslateStatusToRussian(statusDisplay !== null ? statusDisplay : tooltip)
    }
    if (dropdownType === DropdownTypeEnum.SORT) {
      return TranslateSortToRussian(sortDisplay)
    }
    if (dropdownType === DropdownTypeEnum.ORDER) {
      return TranslateOrderToRussian(orderDisplay)
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
      <div
        className={[styles['selectComponent-dropdown'], styles[openDropdown ? 'active' : '']].join(
          ' ',
        )}
      >
        <ul className={styles['dropdown-list']}>
          {<SelectDropdown dropdownType={dropdownType} />}
        </ul>
      </div>
    </div>
  )
}

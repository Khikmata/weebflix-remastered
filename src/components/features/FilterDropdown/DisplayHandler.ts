import { DropdownTypeEnum } from '@utils/constants/AnimeData'

import {
  TranslateOrder,
  TranslateRating,
  TranslateSeason,
  TranslateSort,
  TranslateStatus,
  TranslateType,
} from '@utils/i18n'
import { useAppSelector } from '../../../hooks/redux'

interface displayHandlerProps {
  dropdownType: DropdownTypeEnum
  tooltip: string
}

export const useDisplayHandler = ({
  dropdownType,
  tooltip,
}: displayHandlerProps) => {
  const { ...filterDisplays } = useAppSelector((state) => state.filterReducer)
  const { year: seasonYear, season: seasonSeason } =
    filterDisplays.seasonFilters
  const genreDisplay = filterDisplays.genreFilters.selectedGenresNames
  const typesDisplay = filterDisplays.typeFilters.typeDisplay
  const ratingDisplay = filterDisplays.ratingFilters.ratingDisplay
  const producersDisplay = filterDisplays.producerFilters.producersDisplay
  const seasonDisplay =
    TranslateSeason(seasonSeason) + (seasonYear ? ' ' + seasonYear : '')
  const statusDisplay = filterDisplays.statusFilters.statusType
  const sortDisplay = filterDisplays.sortFilters.sortType
  const orderDisplay = filterDisplays.orderFilters.orderBy.value

  if (dropdownType === DropdownTypeEnum.GENRES) {
    return genreDisplay.length !== 0 ? genreDisplay.join(', ') : tooltip
  }
  if (dropdownType === DropdownTypeEnum.TYPES) {
    return TranslateType(typesDisplay)
  }
  if (dropdownType === DropdownTypeEnum.RATING) {
    return TranslateRating(ratingDisplay)
  }
  if (dropdownType === DropdownTypeEnum.SEASON) {
    return seasonDisplay ? seasonDisplay : tooltip
  }
  if (dropdownType === DropdownTypeEnum.PRODUCER) {
    return producersDisplay ? producersDisplay : tooltip
  }
  if (dropdownType === DropdownTypeEnum.STATUS) {
    return TranslateStatus(statusDisplay)
  }
  if (dropdownType === DropdownTypeEnum.SORT) {
    return TranslateSort(sortDisplay)
  }
  if (dropdownType === DropdownTypeEnum.ORDER) {
    return TranslateOrder(orderDisplay)
  }
}

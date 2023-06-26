import { DropdownTypeEnum } from '@utils/constants/AnimeData'
import { UseTranslateOrder, UseTranslateSort } from '@utils/i18n'
import { UseTranslateType } from './../utils/i18n/UseTranslateType'
import { useAppSelector } from './redux'

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
    seasonYear && seasonSeason && seasonYear + ' ' + seasonSeason
  const statusDisplay = filterDisplays.statusFilters.statusType
  const sortDisplay = filterDisplays.sortFilters.sortType
  const orderDisplay = filterDisplays.orderFilters.orderBy.value

  if (dropdownType === DropdownTypeEnum.GENRES) {
    return genreDisplay.length !== 0 ? genreDisplay.join(', ') : tooltip
  }
  if (dropdownType === DropdownTypeEnum.TYPES) {
    return UseTranslateType({ type: typesDisplay, tooltip })
  }
  if (dropdownType === DropdownTypeEnum.RATING) {
    return ratingDisplay ? ratingDisplay : tooltip
  }
  if (dropdownType === DropdownTypeEnum.SEASON) {
    return seasonDisplay ? seasonDisplay : tooltip
  }
  if (dropdownType === DropdownTypeEnum.PRODUCER) {
    return producersDisplay ? producersDisplay : tooltip
  }
  if (dropdownType === DropdownTypeEnum.STATUS) {
    return statusDisplay ? statusDisplay : tooltip
  }
  if (dropdownType === DropdownTypeEnum.SORT) {
    return UseTranslateSort(sortDisplay)
  }
  if (dropdownType === DropdownTypeEnum.ORDER) {
    return UseTranslateOrder(orderDisplay)
  }
}

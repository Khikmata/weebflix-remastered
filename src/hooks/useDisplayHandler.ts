import { DropdownTypeEnum } from '@utils/constants/AnimeData'

import {
  TranslateOrder,
  TranslateRating,
  TranslateSeason,
  TranslateSort,
  TranslateStatus,
  TranslateType,
} from '@utils/i18n'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from './redux'

export const useDisplayHandler = (dropdownType: DropdownTypeEnum) => {
  const { t } = useTranslation()
  const { ...filterDisplays } = useAppSelector((state) => state.filterReducer)

  const displayMap = {
    [DropdownTypeEnum.GENRES]:
      filterDisplays.genreFilters.selectedGenresNames.join(', ') ||
      t('filter_genres_placeholder'),
    [DropdownTypeEnum.TYPES]: TranslateType(
      filterDisplays.typeFilters.typeDisplay,
    ),
    [DropdownTypeEnum.RATING]: TranslateRating(
      filterDisplays.ratingFilters.ratingDisplay,
    ),
    [DropdownTypeEnum.SEASON]:
      TranslateSeason(filterDisplays.seasonFilters.season) +
        (filterDisplays.seasonFilters.year
          ? ` ${filterDisplays.seasonFilters.year}`
          : '') || t('filter_seasons_placeholder'),
    [DropdownTypeEnum.PRODUCER]:
      filterDisplays.producerFilters.producersDisplay ||
      t('filter_producers_placeholder'),
    [DropdownTypeEnum.STATUS]: TranslateStatus(
      filterDisplays.statusFilters.statusType,
    ),
    [DropdownTypeEnum.SORT]: TranslateSort(filterDisplays.sortFilters.sortType),
    [DropdownTypeEnum.ORDER]: TranslateOrder(
      filterDisplays.orderFilters.orderBy.value,
    ),
  }

  return displayMap[dropdownType]
}

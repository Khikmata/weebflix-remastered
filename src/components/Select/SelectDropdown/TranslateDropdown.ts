
import { DropdownTypeEnum } from '../../../utils/DataTypes/AnimeData'
import { TranslateGenresToRussian } from '../../../utils/Translation/TranslateGenres'
import { TranslateOrderToRussian } from '../../../utils/Translation/TranslateOrder'
import { TranslateRatingToRussian } from '../../../utils/Translation/TranslateRating'
import { TranslateSeasonToRussian } from '../../../utils/Translation/TranslateRelease'
import { TranslateSortToRussian } from '../../../utils/Translation/TranslateSort'
import { TranslateStatusToRussian } from '../../../utils/Translation/TranslateStatus'
import { TranslateTypeToRussian } from '../../../utils/Translation/TranslateTypes'

export const translateDropdownContent = (item: string, dropdownType: string): string => {
  if (dropdownType === DropdownTypeEnum.GENRES) {
    return TranslateGenresToRussian(item) || item
  }
  if (dropdownType === DropdownTypeEnum.TYPES) {
    return TranslateTypeToRussian(item)
  }
  if (dropdownType === DropdownTypeEnum.RATING) {
    return TranslateRatingToRussian(item)
  }
  if (dropdownType === DropdownTypeEnum.SEASON) {
    return TranslateSeasonToRussian(item)
  }
  if (dropdownType === DropdownTypeEnum.STATUS) {
    return TranslateStatusToRussian(item)
  }
  if (dropdownType === DropdownTypeEnum.SORT) {
    return TranslateSortToRussian(item)
  }
  if (dropdownType === DropdownTypeEnum.ORDER) {
    return TranslateOrderToRussian(item)
  }
  return item
}

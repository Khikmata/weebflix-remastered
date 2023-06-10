import { DropdownTypeEnum } from 'utils/DataTypes/AnimeData';
import {
  TranslateGenresToRussian,
  TranslateTypeToRussian,
  TranslateRatingToRussian,
  TranslateSeasonToRussian,
  TranslateStatusToRussian,
  TranslateSortToRussian,
  TranslateOrderToRussian,
} from 'utils/Translation';

export const translateDropdownContent = (
  item: string,
  dropdownType: string,
): string => {
  if (dropdownType === DropdownTypeEnum.GENRES) {
    return TranslateGenresToRussian(item) || item;
  }
  if (dropdownType === DropdownTypeEnum.TYPES) {
    return TranslateTypeToRussian(item);
  }
  if (dropdownType === DropdownTypeEnum.RATING) {
    return TranslateRatingToRussian(item);
  }
  if (dropdownType === DropdownTypeEnum.SEASON) {
    return TranslateSeasonToRussian(item);
  }
  if (dropdownType === DropdownTypeEnum.STATUS) {
    return TranslateStatusToRussian(item);
  }
  if (dropdownType === DropdownTypeEnum.SORT) {
    return TranslateSortToRussian(item);
  }
  if (dropdownType === DropdownTypeEnum.ORDER) {
    return TranslateOrderToRussian(item);
  }
  return item;
};

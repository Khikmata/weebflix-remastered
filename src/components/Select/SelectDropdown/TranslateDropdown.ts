import { DropDownTypeEnum } from "../../../utils/DataTypes/AnimeData";
import { TranslateGenresToRussian } from "../../../utils/Translation/TranslateGenres";
import { TranslateRatingToRussian } from "../../../utils/Translation/TranslateRating";
import { TranslateSeasonToRussian } from "../../../utils/Translation/TranslateRelease";
import { TranslateStatusToRussian } from "../../../utils/Translation/TranslateStatus";
import { TranslateTypeToRussian } from "../../../utils/Translation/TranslateTypes";

export const translateDropdownContent = (item: string, dropDownType: string): string => {
	if (dropDownType === DropDownTypeEnum.GENRES) {
		return TranslateGenresToRussian(item) || item;
	}
	if (dropDownType === DropDownTypeEnum.TYPES) {
		return TranslateTypeToRussian(item);
	}
	if (dropDownType === DropDownTypeEnum.RATING) {
		return TranslateRatingToRussian(item);
	}
	if (dropDownType === DropDownTypeEnum.SEASON) {
		return TranslateSeasonToRussian(item);
	}
	if (dropDownType === DropDownTypeEnum.STATUS) {
		return TranslateStatusToRussian(item);
	}
	return item;
};

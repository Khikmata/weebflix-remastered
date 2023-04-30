
import { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

import Dropdown from '../../assets/icons/dropdown.svg';
import styles from './SelectComponent.styles.module.scss';


import { DropDownTypeEnum } from '../../utils/DataTypes/AnimeData';

import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateRatingToRussian } from '../../utils/Translation/TranslateRating';
import { TranslateSeasonToRussian } from '../../utils/Translation/TranslateRelease';
import { TranslateTypeToRussian } from '../../utils/Translation/TranslateTypes';

import { TranslateStatusToRussian } from '../../utils/Translation/TranslateStatus';
import { SelectDropdown } from './SelectDropdown';

interface SelectComponentProps {
	title: string;
	tooltip: string;
	dropDownType: string;

}



export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, dropDownType }) => {

	const [openDropdown, setOpenDropdown] = useState(false);

	const { year: seasonYear, season: seasonSeason } = useAppSelector((state) => state.seasonsFilter)

	//tooltips for inputs
	const genreDisplay = useAppSelector((state) => state.genreFilter.genresName);
	const typesDisplay = useAppSelector((state) => state.typeFilter.typeDisplay)
	const ratingDisplay = useAppSelector((state) => state.ratingFilter.ratingDisplay)
	const producersDisplay = useAppSelector((state) => state.studioFilter.producersDisplay)
	const seasonDisplay = `${seasonYear} ` + TranslateSeasonToRussian(seasonSeason);
	const statusDisplay = useAppSelector((state) => state.statusFilter.statusType)


	//Отображение выбранных нами параметров и их перевод
	const GetTooltipDisplay = useCallback((display: string[] | string | null, translateTo?: (display: string) => void) => {
		let result = "";
		if (display !== null) {
			if (display.length !== 0) {
				//если текст для дисплея не нужно переводить, то возвращаем оригинальный дисплей
				if (!translateTo) {
					return result += display;
				}
				//Дисплей переводится, для дисплея жанров добавляется ',' для перечисления
				for (let i = 0; i < display.length; i++) {
					translateTo && (result += `${translateTo(display[i])}${display === genreDisplay ? ', ' : ''}`);
				}
				//Если никакой из вариантов не выбран, получаем исходный тултип
				if (result === ' ') {
					return tooltip
				}
				//возвращаем результат дисплея (с/без) перевод(ом/а)
				return result;
			}
		}
		return tooltip
	}, [genreDisplay, tooltip]);

	//Перенаправление конкретных селектов для отображения
	const displayHandler = useMemo(() => {
		if (dropDownType === DropDownTypeEnum.GENRES) {
			return GetTooltipDisplay(genreDisplay, TranslateGenresToRussian)
		}
		if (dropDownType === DropDownTypeEnum.TYPES) {
			return GetTooltipDisplay(typesDisplay, TranslateTypeToRussian)
		}
		if (dropDownType === DropDownTypeEnum.RATING) {
			return GetTooltipDisplay(ratingDisplay, TranslateRatingToRussian)
		}
		if (dropDownType === DropDownTypeEnum.SEASON) {
			return seasonDisplay === ' ' ? tooltip : seasonDisplay;
		}
		if (dropDownType === DropDownTypeEnum.STUDIO) {
			return GetTooltipDisplay(producersDisplay)
		}
		if (dropDownType === DropDownTypeEnum.STATUS) {
			return statusDisplay === '' ? tooltip : (TranslateStatusToRussian(statusDisplay !== null ? statusDisplay : tooltip));
		}
	}, [dropDownType,
		genreDisplay,
		producersDisplay,
		ratingDisplay,
		seasonDisplay,
		tooltip,
		typesDisplay,
		statusDisplay])

	const handleDropdown = useCallback(() => {
		setOpenDropdown(prevState => !prevState);
	}, []);


	return (
		<div className={styles['selectComponent']}>
			<p>{title}</p>
			<button onClick={handleDropdown} className={styles['selectComponent-container']}>
				<p>{displayHandler}</p>
				<img src={Dropdown} width={12} alt='Выпадающее меню' />
			</button>
			<div className={[styles['selectComponent-dropdown'], styles[openDropdown ? 'active' : '']].join(' ')}>
				<ul className={styles['dropdown-list']}>
					{
						<SelectDropdown dropDownType={dropDownType} />
					}
				</ul>
			</div>
		</div>
	)
}

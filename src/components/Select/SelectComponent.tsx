
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

import Dropdown from '../../assets/icons/dropdown.svg';
import styles from './SelectComponent.styles.module.scss';


import { DropDownTypeEnum } from '../../utils/DataTypes/AnimeData';

import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateRatingToRussian } from '../../utils/Translation/TranslateRating';
import { TranslateSeasonToRussian } from '../../utils/Translation/TranslateRelease';
import { TranslateTypeToRussian } from '../../utils/Translation/TranslateTypes';

import { SelectDropdown } from './SelectDropdown';

interface SelectComponentProps {
	title: string;
	tooltip: string;
	dropDownType: string;

}



export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, dropDownType }) => {

	const [openDropdown, setOpenDropdown] = useState(false);

	const seasonYear = useAppSelector((state) => state.seasonsFilter.year)
	const seasonSeason = useAppSelector((state) => state.seasonsFilter.season)

	const genreDisplay = useAppSelector((state) => state.genreFilter.genresName);
	const typesDisplay = useAppSelector((state) => state.typeFilter.typeDisplay)
	const ratingDisplay = useAppSelector((state) => state.ratingFilter.ratingDisplay)
	const producersDisplay = useAppSelector((state) => state.studioFilter.producersDisplay)

	const seasonDisplay = `${seasonYear} ` + TranslateSeasonToRussian(seasonSeason);


	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const addSelectTooltipName = (display: string[] | string, translateTo?: (display: string) => void) => {
		let result = "";
		if (display.length !== 0) {
			for (let i = 0; i < display.length; i++) {
				translateTo && (result += `${translateTo(display[i])}${display === genreDisplay ? ', ' : ''} `);
			}
			if (result === ' ') {
				return tooltip
			}
			return result;
		}
		return tooltip
	}

	//Перенаправлятор
	const placeholderName = () => {
		if (dropDownType === DropDownTypeEnum.GENRES) {
			return addSelectTooltipName(genreDisplay, TranslateGenresToRussian)
		}
		if (dropDownType === DropDownTypeEnum.TYPES) {
			return addSelectTooltipName(typesDisplay, TranslateTypeToRussian)
		}
		if (dropDownType === DropDownTypeEnum.RATING) {
			return addSelectTooltipName(ratingDisplay, TranslateRatingToRussian)
		}
		if (dropDownType === DropDownTypeEnum.SEASON) {
			return seasonDisplay === ' ' ? tooltip : seasonDisplay;
		}
		if (dropDownType === DropDownTypeEnum.STUDIO) {
			return addSelectTooltipName(producersDisplay)
		}
	}

	return (
		<div className={styles['selectComponent']}>
			<p>{title}</p>
			<button onClick={handleDropdown} className={styles['selectComponent-container']}>
				<p>{placeholderName()}</p>
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

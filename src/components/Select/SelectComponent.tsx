
import { useMemo, useState } from 'react';
import Dropdown from '../../assets/icons/dropdown.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SearchFilterActions } from '../../store/reducers/SearchFilterSlice';

import { IGenres } from '../../types/DetailsTypes';
import { AnimeRating, AnimeTypes, DropDownType } from '../../utils/DataTypes/AnimeData';
import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateRatingToRussian } from '../../utils/Translation/TranslateRating';
import { TranslateTypeToRussian } from '../../utils/Translation/TranslateTypes';
import styles from './SelectComponent.styles.module.scss';

interface SelectComponentProps {
	title: string;
	tooltip: string;
	dropDownType: string;
	genresData?: IGenres[];
}



export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, dropDownType, genresData }) => {

	const [selected, setSelected] = useState<null | number>(null);


	const [openDropdown, setOpenDropdown] = useState(false);
	const dispatch = useAppDispatch();

	const genreDisplay = useAppSelector((state) => state.searchFilter.genresName);
	const typesDisplay = useAppSelector((state) => state.searchFilter.typeDisplay)
	const ratingDisplay = useAppSelector((state) => state.searchFilter.ratingDisplay)


	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}


	const handleCheckBoxChange = (item: any, event: React.FormEvent<HTMLInputElement>, i?: number | null) => {
		if (dropDownType === DropDownType.GENRES) {
			const action = event.currentTarget.checked
				? SearchFilterActions.setGenre(item)
				: SearchFilterActions.removeGenre(item);
			dispatch(action);
		}
		if (dropDownType === DropDownType.TYPES) {
			const action = event.currentTarget.checked
				? SearchFilterActions.setType(item)
				: SearchFilterActions.removeType(item);
			dispatch(action);
		}
		if (dropDownType === DropDownType.RATING) {
			const action = event.currentTarget.checked
				? SearchFilterActions.setRating(TranslateRatingToRussian(item))
				: SearchFilterActions.removeRating(TranslateRatingToRussian(item));
			dispatch(action);
		}
	}

	const sortedAnimeGenres = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			if (genresData) {
				return [...genresData]?.sort((a, b) => b.count - a.count);
			}
		}
		return genresData;
	}, [genresData, dropDownType]);


	//Логика появления жанров внутри селектора
	const addSelectTooltipName = (display: string[], translateTo?: (display: string) => void) => {
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

	const placeholderName = () => {
		if (dropDownType === DropDownType.GENRES) {
			return addSelectTooltipName(genreDisplay, TranslateGenresToRussian)
		}
		if (dropDownType === DropDownType.TYPES) {
			return addSelectTooltipName(typesDisplay, TranslateTypeToRussian)
		}
		if (dropDownType === DropDownType.RATING) {
			return addSelectTooltipName(ratingDisplay, TranslateRatingToRussian)
		}
	}


	const translateDropdownContent = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			return TranslateGenresToRussian;
		}
		if (dropDownType === DropDownType.TYPES) {
			return TranslateTypeToRussian;
		}
		if (dropDownType === DropDownType.RATING) {
			return TranslateRatingToRussian;
		}
		return (item: string) => item;
	}, [dropDownType]);




	const dropDownContent = (animeData: any) => {
		return (
			<>
				{
					animeData && animeData.map((item: any, index: number) => (
						<label key={index}>
							<li>
								<input onChange={(event) => handleCheckBoxChange(item, event)} type='checkbox' />
								{dropDownType === DropDownType.GENRES
									? translateDropdownContent(item.name) + `(${item.count && item.count})`
									: translateDropdownContent(item)
								}
							</li>
						</label >
					))
				}
			</>
		)
	}

	const renderDropDown = () => {
		switch (dropDownType) {
			case DropDownType.GENRES:
				return dropDownContent(sortedAnimeGenres);
			case DropDownType.TYPES:
				return dropDownContent(AnimeTypes)
			case DropDownType.RATING:
				return dropDownContent(AnimeRating)
			case DropDownType.EPISODE:
				return (
					<>
						<label><li><input type='checkbox'></input>0-12 Серии</li></label>
						<label><li><input type='checkbox'></input>13-24 Серии</li></label>
						<label><li><input type='checkbox'></input>25+</li></label>
					</>
				)
			case DropDownType.SEASON:
				return (
					<>
						<label><li><input type='checkbox'></input>2023 Весна</li></label>
						<label><li><input type='checkbox'></input>2022 Зима</li></label >
						<label><li><input type='checkbox'></input>2022 Осень</li></label >
						<label><li><input type='checkbox'></input>2022 Лето</li></label >
						<label><li><input type='checkbox'></input>2022 Весна</li></label >
					</>
				)
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
						renderDropDown()
					}
				</ul>
			</div>
		</div>
	)
}

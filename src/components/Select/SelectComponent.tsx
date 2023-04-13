
import { useMemo, useState } from 'react';
import Dropdown from '../../assets/icons/dropdown.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SearchFilterActions } from '../../store/reducers/SearchFilterSlice';

import { IGenres } from '../../types/DetailsTypes';
import { AnimeTypes } from '../../utils/DataTypes/InfoBlockData';
import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateTypeToRussian } from '../../utils/Translation/TranslateTypes';
import styles from './SelectComponent.styles.module.scss';

export enum DropDownType {
	GENRES = 'genres',
	TYPES = 'types',
	SORT = 'sort',
	RATING = 'rating',
	SEASON = 'season',
	EPISODE = 'episode',
	STUDIO = 'studio',
	STATUS = 'status',
}

interface SelectComponentProps {
	data?: IGenres[];
	title: string;
	tooltip: string;
	dropDownType: DropDownType;
}



export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, dropDownType, data }) => {

	const [openDropdown, setOpenDropdown] = useState(false);
	const dispatch = useAppDispatch();

	const genreDisplay = useAppSelector((state) => state.searchFilter.genresName);
	const typesDisplay = useAppSelector((state) => state.searchFilter.typeQuery)


	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const handleCheckBoxChange = (item: any, event: React.FormEvent<HTMLInputElement>) => {
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
	}

	const placeholderName = () => {
		if (dropDownType === DropDownType.GENRES) {
			if (genreDisplay.length !== 0) {
				let result = "";
				for (let i = 0; i < genreDisplay.length; i++) {
					result += `${TranslateGenresToRussian(genreDisplay[i])}, `;
				}
				return result.slice(0, -2);
			}
			return tooltip;
		}
		if (dropDownType === DropDownType.TYPES) {
			if (typesDisplay.length !== 0) {
				let result = "";
				for (let i = 0; i < typesDisplay.length; i++) {
					result += `${TranslateTypeToRussian(typesDisplay[i])}, `;
				}
				return result.slice(0, -2);
			}
			return tooltip;
		}
		return tooltip;
	}


	const translateDropdownContent = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			return TranslateGenresToRussian;
		}
		if (dropDownType === DropDownType.TYPES) {
			return TranslateTypeToRussian;
		}
		return (item: string) => item;
	}, [dropDownType]);

	const sortedDropDownContent = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			if (data) {
				return [...data]?.sort((a, b) => b.count - a.count);
			}
		}
		return data;
	}, [data, dropDownType]);


	const renderDropDown = () => {
		switch (dropDownType) {
			case DropDownType.GENRES:
				return (
					<>
						{
							sortedDropDownContent && sortedDropDownContent.map((item: IGenres, index) => (
								<label key={index}>
									<li>
										<input onChange={(event) => handleCheckBoxChange(item, event)} type='checkbox' />
										{translateDropdownContent(item.name)} ({item.count})
									</li>
								</label >
							))
						}
					</>
				)
			case DropDownType.TYPES:
				return (
					<>
						{
							AnimeTypes && AnimeTypes.map((item: string, index) => (
								<label key={index}>
									<li>
										<input onChange={(event) => handleCheckBoxChange(item, event)} type='checkbox' />
										{translateDropdownContent(item)}
									</li>
								</label >
							))
						}
					</>
				)
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

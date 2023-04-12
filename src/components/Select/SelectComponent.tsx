
import { useMemo, useState } from 'react';
import Dropdown from '../../assets/icons/dropdown.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SearchFilterActions } from '../../store/reducers/SearchFilterSlice';
import { IGenres } from '../../types/GetAnimeTypes';
import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateThemesToRussian } from '../../utils/Translation/TranslateThemes';
import styles from './SelectComponent.styles.module.scss';

export enum DropDownType {
	GENRES = 'genres',
	THEMES = 'themes',
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
	const genreNames = useAppSelector((state) => state.searchFilter.genresName)



	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const handleCheckBoxChange = (item: IGenres, event: React.FormEvent<HTMLInputElement>) => {
		const action = event.currentTarget.checked
			? SearchFilterActions.setGenre(item)
			: SearchFilterActions.removeGenre(item);
		dispatch(action);
	}

	const translateDropdownContent = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			return TranslateGenresToRussian;
		}
		if (dropDownType === DropDownType.THEMES) {
			return TranslateThemesToRussian;
		}
		return (item: string) => item;
	}, [dropDownType]);

	const sortedData = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			if (data) {
				return [...data]?.sort((a, b) => b.count - a.count);
			}
		}
		if (dropDownType === DropDownType.THEMES) {
			if (data) {
				return [...data]?.sort((a, b) => a.mal_id - b.mal_id);
			}
		}
		return data;
	}, [data, dropDownType]);


	const renderDropDown = () => {
		switch (dropDownType) {
			case DropDownType.GENRES:
			case DropDownType.THEMES:
				return (
					<>
						{
							sortedData && [...sortedData].map((item: IGenres, index) => (
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
						<label><li><input type='checkbox'></input>ТВ-Сериал</li></label >
						<label><li><input type='checkbox'></input>Фильм</li></label >
						<label><li><input type='checkbox'></input>OVA</li></label >
						<label><li><input type='checkbox'></input>Спешл</li></label >
						<label><li><input type='checkbox'></input>ONA</li></label >
						<label><li><input type='checkbox'></input>Музыка</li></label >
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
				<p>{genreNames ? genreNames : tooltip}</p>
				{!genreNames && <img src={Dropdown} width={12} alt='Выпадающее меню' />}
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

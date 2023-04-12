
import { useState } from 'react';
import Dropdown from '../../assets/icons/dropdown.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SearchFilterActions } from '../../store/reducers/SearchFilterSlice';
import { IGenres } from '../../types/GetAnimeTypes';
import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateThemesToRussian } from '../../utils/Translation/TranslateThemes';
import styles from './SelectComponent.styles.module.scss';

export enum SelectType {
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
	type: SelectType;
}



export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, type, data }) => {

	const [openDropdown, setOpenDropdown] = useState(false);

	const dispatch = useAppDispatch();
	const genreNames = useAppSelector((state) => state.searchFilter.genresName)
	console.log(genreNames)
	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const handleGenreCheckmark = (item: IGenres, event: React.FormEvent<HTMLInputElement>) => {
		event.currentTarget.checked
			? dispatch(SearchFilterActions.setGenre(item))
			: dispatch(SearchFilterActions.removeGenre(item));
	}

	const translateGenreToDisplay = (item: string) => {
		if (type === SelectType.GENRES) {
			return TranslateGenresToRussian(item)
		}
		if (type === SelectType.THEMES) {
			return TranslateThemesToRussian(item)
		}
	}

	const renderByType = () => {
		if (type === SelectType.GENRES) {
			return (
				<>
					{
						data && [...data].sort((b, a) => a.count - b.count).map((item: IGenres, index) => (
							<label key={index}>
								<li>
									<input onChange={(event) => handleGenreCheckmark(item, event)} type='checkbox' />
									{TranslateGenresToRussian(item.name)} ({item.count})
								</li>
							</label >
						))
					}
				</>
			)
		}
		if (type === SelectType.THEMES) {
			return (
				<>
					{
						data && [...data].sort((b, a) => a.mal_id - b.mal_id).map((item: IGenres, index) => (
							<label key={index}>
								<li>
									<input onChange={(event) => handleGenreCheckmark(item, event)} type='checkbox' />
									{TranslateThemesToRussian(item.name)} ({item.count})
								</li>
							</label >
						))
					}
				</>
			)
		}
		if (type === SelectType.TYPES) {
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
		}
		if (type === SelectType.EPISODE) {
			return (
				<>
					<label><li><input type='checkbox'></input>0-12 Серии</li></label>
					<label><li><input type='checkbox'></input>13-24 Серии</li></label>
					<label><li><input type='checkbox'></input>25+</li></label>
				</>
			)
		}
		if (type === SelectType.SEASON) {
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
						renderByType()
					}
				</ul>
			</div>
		</div>
	)
}


import { useState } from 'react';
import Dropdown from '../../assets/icons/dropdown.svg';
import { IGenres } from '../../types/GetAnimeTypes';
import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import styles from './SelectComponent.styles.module.scss';

export enum SelectType {
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
	type: SelectType;
}


export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, type, data }) => {

	const [openDropdown, setOpenDropdown] = useState(false);

	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const renderByType = () => {
		if (type === SelectType.GENRES) {
			return (
				<>
					{
						data && data.map((item: IGenres) => (
							<label><li><input type='checkbox'></input>{TranslateGenresToRussian(item.name)}</li></label >
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
				<p>{tooltip}</p>
				<img src={Dropdown} width={12} alt='Выпадающее меню' />
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

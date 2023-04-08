
import Dropdown from '../../assets/icons/dropdown.svg';
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
	title: string;
	tooltip: string;
	type: SelectType;
}


export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, type }) => {

	const renderByType = () => {
		if (type === SelectType.GENRES) {
			return (
				<>
					<li><input type='checkbox'></input>Экшен</li>
					<li><input type='checkbox'></input>Экшен</li>
					<li><input type='checkbox'></input>Экшен</li>
				</>
			)
		}
		if (type === SelectType.TYPES) {
			return (
				<>
					<li><input type='checkbox'></input>ТВ-Сериал</li>
					<li><input type='checkbox'></input>Фильм</li>
					<li><input type='checkbox'></input>OVA</li>
					<li><input type='checkbox'></input>Спешл</li>
					<li><input type='checkbox'></input>ONA</li>
					<li><input type='checkbox'></input>Музыка</li>
				</>
			)
		}
		if (type === SelectType.EPISODE) {
			return (
				<>
					<li><input type='checkbox'></input>0-12 Серии</li>
					<li><input type='checkbox'></input>13-24 Серии</li>
					<li><input type='checkbox'></input>25+</li>
				</>
			)
		}
		if (type === SelectType.SEASON) {
			return (
				<>
					<li><input type='checkbox'></input>2023 Весна</li>
					<li><input type='checkbox'></input>2022 Зима</li>
					<li><input type='checkbox'></input>2022 Осень</li>
					<li><input type='checkbox'></input>2022 Лето</li>
					<li><input type='checkbox'></input>2022 Весна</li>
				</>
			)
		}
	}


	return (
		<button className={styles['selectComponent']}>
			<p>{title}</p>
			<div className={styles['selectComponent-container']}>
				<p>{tooltip}</p>
				<img src={Dropdown} width={12} alt='Выпадающее меню' />
			</div>
			<div className={styles['selectComponent-dropdown']}>
				<ul className={styles['dropdown-list']}>
					{
						renderByType()
					}
				</ul>
			</div>
		</button>
	)
}

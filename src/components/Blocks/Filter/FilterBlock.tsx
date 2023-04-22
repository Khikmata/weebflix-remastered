
import dropdownIcon from '../../../assets/icons/dropdown.svg';
import filterIcon from '../../../assets/icons/filters.svg';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { SearchFilterActions } from '../../../store/reducers/SearchFilterSlice';
import { AnimeApi } from '../../../store/services/getAnime';
import { RangeComponent } from '../../Range';
import { SelectComponent } from '../../Select';
import styles from './FilterBlock.styles.module.scss';

import { useState } from 'react';

export const FilterBlock = () => {

	const { data: genresData } = AnimeApi.useGetAnimeGenresQuery('s');
	const { data: seasonsData } = AnimeApi.useGetAnimeSeasonsQuery('')


	const [openFilters, setOpenFilters] = useState(true);
	const dispatch = useAppDispatch();

	const handleFiltersDropdown = () => {
		setOpenFilters(!openFilters)
	}

	const handleScoreChange = (values: number[]) => {
		dispatch(SearchFilterActions.setMinScore(values[0]));
		dispatch(SearchFilterActions.setMaxScore(values[1]));
	}

	const handleDateChange = (values: number[]) => {
		dispatch(SearchFilterActions.setDateFrom(values[0]));
		dispatch(SearchFilterActions.setDateTo(values[1]));
	}

	const selectTitle = [
		'Жанры', 'Тип', 'Рейтинг', 'Сезон', 'Студия', 'Статус', 'Отсортровать по:'
	];
	const selectTooltip = [
		'Cортировать по жанрам', 'Сортировать по типам', 'Сортировать по рейтингу',
		'Сортировать по сезонам', 'Сортировать по студии', 'Сортировать по статусу', 'Сортировать по оценке'
	];
	const SelectDropDownType = [
		'genres', 'types', 'rating', 'season', 'studio', 'status', 'sort'
	]

	return (
		<>
			<button onClick={handleFiltersDropdown} className={styles['filter-title']}>
				<img width={16} src={filterIcon} alt='Фильтр картинка' />
				Фильтр
				<img className={styles['filter-title__dropdown']} src={dropdownIcon} width={12} alt='Выпадающее меню'></img>
			</button >
			<div className={[styles['filterblock'], styles[openFilters ? 'active' : '']].join(' ')}>
				<RangeComponent
					min={0}
					max={10}
					step={1}
					title={'Сортировка по рейтингу:'}
					handleRange={handleScoreChange}
				/>
				<RangeComponent
					showMiles={false}
					min={1960}
					max={2023}
					step={1}
					title={'Сортировка по дате:'}
					handleRange={handleDateChange}
				/>
				{
					selectTitle.map((_, index) => (
						<SelectComponent key={index} title={selectTitle[index]} tooltip={selectTooltip[index]} dropDownType={SelectDropDownType[index]} genresData={genresData} seasonsData={seasonsData} />)
					)}
			</div >
		</>
	)
}

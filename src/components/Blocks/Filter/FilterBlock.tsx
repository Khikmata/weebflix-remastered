
import dropdownIcon from '../../../assets/icons/dropdown.svg';
import filterIcon from '../../../assets/icons/filters.svg';

import { useAppDispatch } from '../../../hooks/redux';
import { SearchFilterActions } from '../../../store/reducers/SearchFilterSlice';
import { AnimeApi } from '../../../store/services/getAnime';
import { RangeComponent } from '../../Range';
import { SelectComponent } from '../../Select';
import { SelectType } from '../../Select/SelectComponent';
import styles from './FilterBlock.styles.module.scss';

import { useState } from 'react';

export const FilterBlock = () => {

	const { data: genresData, error: genresErrors, isLoading: genresLoading } = AnimeApi.useGetAnimeGenresQuery(0);

	const [openFilters, setOpenFilters] = useState(false);
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

	console.log(genresData)

	return (
		<>
			<button onClick={handleFiltersDropdown} className={styles['filter-title']}><img width={16} src={filterIcon} alt='Фильтр картинка'></img>Фильтр <img className={styles['filter-title__dropdown']} src={dropdownIcon} width={12} alt='Выпадающее меню'></img></button >
			<div className={[styles['filterblock'], styles[openFilters ? 'active' : '']].join(' ')}>
				<RangeComponent min={0} max={10} step={1} title={'Сортировка по рейтингу:'} handleRange={handleScoreChange} />
				<RangeComponent showMiles={false} min={1990} max={2023} step={1} title={'Сортировка по дате:'} handleRange={handleDateChange} />
				<SelectComponent data={genresData && genresData.data} title='Жанры:' tooltip='Выбрать жанры' type={SelectType.GENRES} />
				<SelectComponent title='Тип:' tooltip='Выбрать тип' type={SelectType.TYPES} />
				<SelectComponent title='Отсортировать по:' tooltip='Рейтингу' type={SelectType.SORT} />
				<SelectComponent title='Рейтинг:' tooltip='Отсортировать по рейтингу' type={SelectType.RATING} />
				<SelectComponent title='Сезон:' tooltip='Выбрать сезон' type={SelectType.SEASON} />
				<SelectComponent title='Количество эпизодов:' tooltip='Выбрать размер' type={SelectType.EPISODE} />
				<SelectComponent title='Студия:' tooltip='Выбрать студию' type={SelectType.STUDIO} />
				<SelectComponent title='Статус:' tooltip='Выбрать статус' type={SelectType.STATUS} />
			</div >
		</>
	)
}

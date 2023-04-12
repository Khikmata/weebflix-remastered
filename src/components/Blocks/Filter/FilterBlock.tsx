
import dropdownIcon from '../../../assets/icons/dropdown.svg';
import filterIcon from '../../../assets/icons/filters.svg';

import { useAppDispatch } from '../../../hooks/redux';
import { SearchFilterActions } from '../../../store/reducers/SearchFilterSlice';
import { AnimeApi } from '../../../store/services/getAnime';
import { RangeComponent } from '../../Range';
import { SelectComponent } from '../../Select';
import { DropDownType } from '../../Select/SelectComponent';
import styles from './FilterBlock.styles.module.scss';

import { useState } from 'react';

export const FilterBlock = () => {

	const { data: genresData, error: genresErrors, isLoading: genresLoading } = AnimeApi.useGetAnimeGenresQuery('Avant Garde');

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
				{genresLoading && <p> Загрузка жанров и типов... </p>}
				{genresErrors && <p> Произошла ошибка при загрузке жанров... </p>}
				{genresData && <SelectComponent data={genresData?.genres} title='Жанры:' tooltip='Выбрать жанры' dropDownType={DropDownType.GENRES} />}
				{genresData && <SelectComponent data={genresData?.themes} title='Тематика:' tooltip='Выбрать тематику' dropDownType={DropDownType.THEMES} />}
				<SelectComponent title='Тип:' tooltip='Выбрать тип' dropDownType={DropDownType.TYPES} />
				<SelectComponent title='Отсортировать по:' tooltip='Рейтингу' dropDownType={DropDownType.SORT} />
				<SelectComponent title='Рейтинг:' tooltip='Отсортировать по рейтингу' dropDownType={DropDownType.RATING} />
				<SelectComponent title='Сезон:' tooltip='Выбрать сезон' dropDownType={DropDownType.SEASON} />
				<SelectComponent title='Количество эпизодов:' tooltip='Выбрать размер' dropDownType={DropDownType.EPISODE} />
				<SelectComponent title='Студия:' tooltip='Выбрать студию' dropDownType={DropDownType.STUDIO} />
				<SelectComponent title='Статус:' tooltip='Выбрать статус' dropDownType={DropDownType.STATUS} />
			</div >
		</>
	)
}

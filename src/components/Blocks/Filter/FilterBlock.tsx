
import filterIcon from '../../../assets/icons/filters.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { SearchFilterActions } from '../../../store/reducers/SearchFilterSlice';
import { RangeComponent } from '../../Range';
import { SelectComponent } from '../../Select';
import { SelectType } from '../../Select/SelectComponent';
import styles from './FilterBlock.styles.module.scss';

export const FilterBlock = () => {
	const dispatch = useAppDispatch();

	const handleScoreChange = (values: number[]) => {
		dispatch(SearchFilterActions.setMinScore(values[0]));
		dispatch(SearchFilterActions.setMaxScore(values[1]));
	}

	const handleDateChange = (values: number[]) => {
		dispatch(SearchFilterActions.setDateFrom(values[0]));
		dispatch(SearchFilterActions.setDateTo(values[1]));
	}

	return (
		<>
			<p className={styles['filter__title']}><img width={16} src={filterIcon} alt='Фильтр картинка'></img>Фильтр</p>
			<div className={styles['filterblock']}>
				<RangeComponent min={0} max={10} step={1} title={'Сортировка по рейтингу:'} handleRange={handleScoreChange} />
				<RangeComponent showMiles={false} min={1990} max={2023} step={1} title={'Сортировка по дате:'} handleRange={handleDateChange} />
				<SelectComponent title='Жанры:' tooltip='Выбрать жанры' type={SelectType.GENRES} />
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

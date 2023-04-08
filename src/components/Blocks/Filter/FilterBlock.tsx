
import filterIcon from '../../../assets/icons/filters.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { SearchFilterActions } from '../../../store/reducers/SearchFilterSlice';
import { RangeComponent } from '../../Range';
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
			</div >
		</>
	)
}

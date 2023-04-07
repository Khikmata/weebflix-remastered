
import { useAppSelector } from '../../../hooks/redux';
import { AnimeApi } from '../../../store/services/getAnime';
import { IData } from '../../../types/GetAnimeTypes';
import { RangeComponent } from '../../Range';
import styles from './FilterBlock.styles.module.scss';

export const FilterBlock = () => {



	return (
		<>
			<p className={styles['filter__title']}>Фильтр</p>
			<div className={styles['filterblock']}>
				<RangeComponent min={0} max={10} step={1} />
			</div >
		</>
	)
}

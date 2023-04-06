
import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { SearchFilterActions } from '../../../store/reducers/SearchFilterSlice';
import { AnimeApi } from '../../../store/services/getAnime';
import { IData } from '../../../types/GetAnimeTypes';
import styles from './FilterBlock.styles.module.scss';

export const FilterBlock = () => {

	const dispatch = useAppDispatch();

	const [maxRating, setMaxRating] = useState<string>('10')
	const [minRating, setMinRating] = useState<string>('0')

	const { data: filteredData, error: top1000Errors, isLoading: top100Loading } = AnimeApi.useGetAnimeSearchQuery({ max_score: maxRating });
	console.log(filteredData);
	console.log(maxRating);

	const marks = {
		0: "1",
		1: '2',
		2: "3",
		3: '4',
		4: "5",
		5: '6',
		6: "7",
		7: '8',
		8: '9',
		9: '10',
	}


	return (
		<>
			<p className={styles['filter__title']}>Фильтр</p>
			<div className={styles['filterblock']}>
				<input
					type='range'
					min={0}
					max={10}
					value={maxRating}
					onChange={(e) => setMaxRating(e.target.value)}
				/>
				{
					filteredData?.data.map((item: IData) => (
						<div> {item.title}</div>
					))
				}
			</div >
		</>
	)
}

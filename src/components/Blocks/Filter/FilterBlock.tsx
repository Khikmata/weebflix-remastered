import { useState } from 'react';
import { AnimeApi } from '../../../store/services/getAnime';
import { IData } from '../../../types/GetAnimeTypes';
import styles from './FilterBlock.styles.module.scss';

export const FilterBlock = () => {



	const [maxRating, setMaxRating] = useState<string>('10')

	const { data: filteredData, error: top1000Errors, isLoading: top100Loading } = AnimeApi.useGetAnimeSearchQuery({ max_score: maxRating });

	console.log(filteredData)
	console.log(maxRating)
	return (
		<>
			<p className={styles['filter__title']}>Фильтр</p>
			<div className={styles['filterblock']}>
				<datalist id="tick-list">
					<option value="1"></option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</datalist>
				<input className={styles['filterblock-filter__maxrating']} type='range' max={10} min={0} value={maxRating} list='tick-list' onChange={(e) => setMaxRating(e.target.value)}></input>
				{
					filteredData?.data.map((item: IData) => (
						<div> {item.title}</div>
					))
				}
			</div >
		</>
	)
}

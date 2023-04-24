
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Dropdown from '../../assets/icons/dropdown.svg';
import styles from './SelectComponent.styles.module.scss';

import { IGenres } from '../../types/DetailsTypes';
import { IProducers, ISeasons } from '../../types/FetchTypes';

import { AnimeRating, AnimeTypes, DropDownType } from '../../utils/DataTypes/AnimeData';

import { TranslateGenresToRussian } from '../../utils/Translation/TranslateGenres';
import { TranslateRatingToRussian } from '../../utils/Translation/TranslateRating';
import { TranslateSeasonToRussian } from '../../utils/Translation/TranslateRelease';
import { TranslateTypeToRussian } from '../../utils/Translation/TranslateTypes';

import { genreFilterActions } from '../../store/reducers/Filters/GenreFilterSlice';
import { ratingFilterActions } from '../../store/reducers/Filters/RatingFilterSlice';
import { seasonFilterActions } from '../../store/reducers/Filters/SeasonsFilterSlice';
import { studioFilterActions } from '../../store/reducers/Filters/StudioFilterSlice';
import { typeFilterActions } from '../../store/reducers/Filters/TypeFilterSlice';

interface SelectComponentProps {
	title: string;
	tooltip: string;
	dropDownType: string;
	genresData?: IGenres[];
	seasonsData?: ISeasons[];
	producersData?: IProducers[];
}



export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip, dropDownType, genresData, seasonsData, producersData }) => {

	const [selected, setSelected] = useState<null | number>(null);


	const [openDropdown, setOpenDropdown] = useState(false);
	const dispatch = useAppDispatch();

	const genreDisplay = useAppSelector((state) => state.genreFilter.genresName);
	const typesDisplay = useAppSelector((state) => state.typeFilter.typeDisplay)
	const ratingDisplay = useAppSelector((state) => state.ratingFilter.ratingDisplay)
	const seasonsDisplay = useAppSelector((state) => state.seasonsFilter.season)
	const producersDisplay = useAppSelector((state) => state.studioFilter.producersDisplay)


	const handleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}


	const handleCheckBoxChange = (item: any, event: React.FormEvent<HTMLInputElement>, i?: number | null) => {
		if (dropDownType === DropDownType.GENRES) {
			const action = event.currentTarget.checked
				? genreFilterActions.setGenre(item)
				: genreFilterActions.removeGenre(item);
			dispatch(action);
		}
		if (dropDownType === DropDownType.TYPES) {
			const action = event.currentTarget.checked
				? typeFilterActions.setType(item)
				: typeFilterActions.removeType(item);
			dispatch(action);
		}
		if (dropDownType === DropDownType.RATING) {
			const action = event.currentTarget.checked
				? ratingFilterActions.setRating(TranslateRatingToRussian(item))
				: ratingFilterActions.removeRating(TranslateRatingToRussian(item));
			dispatch(action);
		}
		if (dropDownType === DropDownType.SEASON) {
			const action = event.currentTarget.checked
				? seasonFilterActions.setSeasonData(item)
				: seasonFilterActions.removeSeasonData(item);
			dispatch(action);
		}
		if (dropDownType === DropDownType.STUDIO) {
			const action = event.currentTarget.checked
				? studioFilterActions.setProducer((item))
				: studioFilterActions.removeProducer((item));
			dispatch(action);
		}
	}

	const sortedAnimeGenres = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			if (genresData) {
				return [...genresData]?.sort((a, b) => b.count - a.count);
			}
		}
		return genresData;
	}, [genresData, dropDownType]);


	//Логика появления жанров внутри селектора
	const addSelectTooltipName = (display: string[], translateTo?: (display: string) => void) => {
		let result = "";
		if (display.length !== 0) {
			for (let i = 0; i < display.length; i++) {
				translateTo && (result += `${translateTo(display[i])}${display === genreDisplay ? ', ' : ''} `);
			}
			if (result === ' ') {
				return tooltip
			}
			return result;
		}
		return tooltip
	}

	const placeholderName = () => {
		if (dropDownType === DropDownType.GENRES) {
			return addSelectTooltipName(genreDisplay, TranslateGenresToRussian)
		}
		if (dropDownType === DropDownType.TYPES) {
			return addSelectTooltipName(typesDisplay, TranslateTypeToRussian)
		}
		if (dropDownType === DropDownType.RATING) {
			return addSelectTooltipName(ratingDisplay, TranslateRatingToRussian)
		}
		if (dropDownType === DropDownType.SEASON) {
			return addSelectTooltipName(ratingDisplay, TranslateSeasonToRussian)
		}
		if (dropDownType === DropDownType.STUDIO) {
			return addSelectTooltipName(producersDisplay)
		}
	}


	const translateDropdownContent = useMemo(() => {
		if (dropDownType === DropDownType.GENRES) {
			return TranslateGenresToRussian;
		}
		if (dropDownType === DropDownType.TYPES) {
			return TranslateTypeToRussian;
		}
		if (dropDownType === DropDownType.RATING) {
			return TranslateRatingToRussian;
		}
		if (dropDownType === DropDownType.SEASON) {
			return TranslateSeasonToRussian;
		}
		return (item: string) => item;
	}, [dropDownType]);




	const dropDownContent = (animeData: any) => {
		return (
			<>
				{
					animeData && animeData.map((item: any, index: number) => (
						<label className='container' key={index}>
							<li>
								<input
									onChange={(event) => handleCheckBoxChange(item, event)}
									value={0} onClick={(e) => e.currentTarget.checked ? e.currentTarget.checked : e.currentTarget.checked}
									name={dropDownType}
									type={dropDownType === DropDownType.GENRES ? 'checkbox' : 'radio'} />
								{dropDownType === DropDownType.GENRES && translateDropdownContent(item.name) + `(${item.count && item.count})`}
								{(dropDownType === DropDownType.TYPES || dropDownType === DropDownType.RATING) && translateDropdownContent(item)}
							</li>
						</label >
					))
				}
			</>
		)
	}

	console.log(seasonsData)
	const renderDropDown = () => {
		switch (dropDownType) {
			case DropDownType.GENRES:
				return dropDownContent(sortedAnimeGenres);
			case DropDownType.TYPES:
				return dropDownContent(AnimeTypes)
			case DropDownType.RATING:
				return dropDownContent(AnimeRating)
			case DropDownType.EPISODE:
				return (
					<>
						<label><li><input type='checkbox'></input>0-12 Серии</li></label>
						<label><li><input type='checkbox'></input>13-24 Серии</li></label>
						<label><li><input type='checkbox'></input>25+</li></label>
					</>
				)
			case DropDownType.SEASON:
				return (
					<>
						{
							seasonsData && seasonsData.map((yearSeasons, index) =>
								<div key={index}>
									<p>{yearSeasons.year}</p>
									{yearSeasons.seasons.map((season, index) =>
										<label>
											<li key={index} >
												<input
													type='checkbox'
													onChange={(event) => handleCheckBoxChange({ year: yearSeasons.year, season }, event)} />
												{TranslateSeasonToRussian(season)}
											</li>
										</label>
									)}
								</div>)
						}
					</>
				)
			case DropDownType.STUDIO:
				return (
					<>
						{
							producersData && producersData.map((producer) =>
							(
								<label>
									<li>
										<input type='checkbox' />
										{producer.titles[0].title}
									</li>
								</label>
							))}
					</>
				)
		}
	}

	console.log(producersData)

	return (
		<div className={styles['selectComponent']}>
			<p>{title}</p>
			<button onClick={handleDropdown} className={styles['selectComponent-container']}>
				<p>{placeholderName()}</p>
				<img src={Dropdown} width={12} alt='Выпадающее меню' />
			</button>
			<div className={[styles['selectComponent-dropdown'], styles[openDropdown ? 'active' : '']].join(' ')}>
				<ul className={styles['dropdown-list']}>
					{
						renderDropDown()
					}
				</ul>
			</div>
		</div>
	)
}

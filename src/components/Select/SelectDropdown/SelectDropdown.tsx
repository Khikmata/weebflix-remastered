import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { genreFilterActions, ratingFilterActions, seasonFilterActions, studioFilterActions, typeFilterActions } from '../../../store/reducers/Filters';
import { AnimeRating, AnimeTypes, DropDownTypeEnum } from '../../../utils/DataTypes/AnimeData';
import { TranslateRatingToRussian } from '../../../utils/Translation/TranslateRating';
import { TranslateSeasonToRussian } from '../../../utils/Translation/TranslateRelease';
import { translateDropdownContent } from './TranslateDropdown';

interface SelectDropdownProps {
	dropDownType: string
}


export const SelectDropdown: React.FC<SelectDropdownProps> = ({ dropDownType }) => {

	const dispatch = useAppDispatch();

	const producersData = useAppSelector((state) => state.dropDownData.producersData)
	const genresData = useAppSelector((state) => state.dropDownData.genreData)
	const seasonsData = useAppSelector((state) => state.dropDownData.seasonsData)


	const sortedAnimeGenres = useMemo(() => {
		if (dropDownType === DropDownTypeEnum.GENRES) {
			if (genresData) {
				return [...genresData]?.sort((a, b) => b.count - a.count);
			}
		}
		return genresData;
	}, [genresData, dropDownType]);



	const handleCheckBoxChange = (item: any, event: React.FormEvent<HTMLInputElement>, i?: number | null) => {
		if (dropDownType === DropDownTypeEnum.GENRES) {
			const action = event.currentTarget.checked
				? genreFilterActions.setGenre(item)
				: genreFilterActions.removeGenre(item);
			dispatch(action);
		}
		if (dropDownType === DropDownTypeEnum.TYPES) {
			if (event.currentTarget.checked) {
				return dispatch(typeFilterActions.setType(item))
			} else {
				return dispatch(typeFilterActions.removeType(item))
			}
		}
		if (dropDownType === DropDownTypeEnum.RATING) {
			const action = event.currentTarget.checked
				? ratingFilterActions.setRating(TranslateRatingToRussian(item))
				: ratingFilterActions.removeRating(TranslateRatingToRussian(item));
			dispatch(action);
		}
		if (dropDownType === DropDownTypeEnum.SEASON) {
			const action = event.currentTarget.checked
				? seasonFilterActions.setSeasonData(item)
				: seasonFilterActions.removeSeasonData(item);
			dispatch(action);
		}
		if (dropDownType === DropDownTypeEnum.STUDIO) {
			const action = event.currentTarget.checked
				? studioFilterActions.setProducer((item))
				: studioFilterActions.removeProducer((item));
			dispatch(action);
		}
	}
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
									type={dropDownType === DropDownTypeEnum.GENRES ? 'checkbox' : 'radio'} />
								{dropDownType === DropDownTypeEnum.GENRES && translateDropdownContent(`${item.name} (${item.count && item.count})`, dropDownType)}
								{(dropDownType === DropDownTypeEnum.TYPES || dropDownType === DropDownTypeEnum.RATING) && translateDropdownContent(item, dropDownType)}
							</li>
						</label >
					))
				}
			</>
		)
	}

	const renderDropDown = () => {
		switch (dropDownType) {
			case DropDownTypeEnum.GENRES:
				return dropDownContent(sortedAnimeGenres);
			case DropDownTypeEnum.TYPES:
				return dropDownContent(AnimeTypes)
			case DropDownTypeEnum.RATING:
				return dropDownContent(AnimeRating)
			case DropDownTypeEnum.EPISODE:
				return (
					<>
						<label><li><input type='checkbox'></input>0-12 Серии</li></label>
						<label><li><input type='checkbox'></input>13-24 Серии</li></label>
						<label><li><input type='checkbox'></input>25+</li></label>
					</>
				)
			case DropDownTypeEnum.SEASON:
				return (
					<>
						{
							seasonsData && seasonsData.map((yearSeasons, index) =>
								<div key={index}>
									<p>{yearSeasons.year}</p>
									{yearSeasons.seasons.map((season, index) =>
										<label key={index}>
											<li  >
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
			case DropDownTypeEnum.STUDIO:

				return (
					<>
						{
							producersData && producersData.map((producer, index) =>
							(
								<label key={index}>
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


	return (
		renderDropDown() || undefined || null
	)
}

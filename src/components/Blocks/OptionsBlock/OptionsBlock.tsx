
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { CatalogueActions } from '../../../store/reducers/CatalogueSlice';
import { CatalogueSliderActions } from '../../../store/reducers/CatalogueSliderSlice';
import styles from './OptionsBlock.styles.module.scss';


interface OptionsBlockProps {
	options: string[];
}



export const OptionsBlock: React.FC<OptionsBlockProps> = ({ options }) => {


	const dispatch = useAppDispatch();
	const activeCatalogueSliderOption = useAppSelector((state) => state.catalogueSlider.activeSliderIndex)
	const activeCatalogueOption = useAppSelector((state) => state.catalogue.activeCatalogueIndex)

	function handleActiveOption() {
		if (options[0] === 'Актуальное') {
			console.log(activeCatalogueSliderOption)
			return activeCatalogueSliderOption
		}
		if (options[0] === 'Аниме') {
			return activeCatalogueOption
		}
		return '';
	}

	const handleChangeOption = (index: number) => {
		if (options.includes('Актуальное')) {
			dispatch(CatalogueSliderActions.setActiveCatalogueSliderIndex(index))
		}
		if (options.includes('Аниме')) {
			dispatch(CatalogueActions.setActiveCatalogueIndex(index))
		}
		return '';
	}

	return (
		<div className={styles['options']} >
			<div className={styles['options__content']} >
				<ul>
					{
						options.map((option, index: number) => (
							<li key={index} onClick={() => handleChangeOption(index)} className={styles[`${handleActiveOption() === index && 'active'}`]}>{option}</li>
						))
					}
				</ul>
			</div>
		</div >
	)
}

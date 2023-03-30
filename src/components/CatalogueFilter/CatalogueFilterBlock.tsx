import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CatalogueFilterActions, filterOptions } from '../../store/reducers/CatalogueFilterSlice';
import styles from './CatalogueFilterBlock.styles.module.scss';

export const CatalogueFilterBlock = () => {

	const dispatch = useAppDispatch();
	const activeFilterOption = useAppSelector((state) => state.catalogueFilter.activeFilterIndex)
	const handleChangeOption = (index: number) => {
		dispatch(CatalogueFilterActions.setActiveFilterIndex(index))
	}

	return (
		<div className={styles['catalogue__filter']} >
			<div className={styles['catalogue__filter__content']} >
				<ul>
					{
						filterOptions.map((option, index: number) => (
							<li key={index} onClick={() => handleChangeOption(index)} className={styles[`${activeFilterOption === index && 'active'}`]}>{option}</li>
						))
					}
				</ul>
			</div >
		</div >
	)
}

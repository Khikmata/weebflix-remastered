import { useState } from 'react';
import styles from './CatalogueFilterBlock.styles.module.scss';

const CatalogueFilterBlock = () => {

	const [activeOption, setActiveOption] = useState(1)

	const filterOptions = [
		"Актуальное",
		"Недавно вышедшее",
		"Скоро выйдет",
		"Самое ожидаемое"
	]


	const handleChangeOption = (index: number) => {
		setActiveOption(index)
	}

	return (
		<div className={styles['catalogue__filter']} >
			<div className={styles['catalogue__filter__content']} >
				<ul>
					{
						filterOptions.map((option, index: number) => (
							<li key={index} onClick={() => handleChangeOption(index)} className={styles[`${activeOption === index && 'active'}`]}>{option}</li>
						))
					}
				</ul>
			</div >
		</div >
	)
}

export default CatalogueFilterBlock;
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { translateDropdownContent } from "../../TranslateDropdown";


import { typeFilterActions } from "../../../../../store/reducers/Filters";
import { AnimeTypesData, DropDownTypeEnum } from "../../../../../utils/DataTypes/AnimeData";
import styles from '../FilterDropdown.styles.module.scss';
export const TypeDropdown = () => {

	const [selectedTypeIndex, setSelectedTypeIndex] = useState<number | null>(null);

	const dispatch = useDispatch();


	const getTypeDropdown = useMemo(() => {

		const handleTypeChange = (index: number) => {
			if (index === selectedTypeIndex) {
				dispatch(typeFilterActions.removeType());
				setSelectedTypeIndex(null)
			} else {
				dispatch(typeFilterActions.setType(AnimeTypesData[index]));
				setSelectedTypeIndex(index)
			}
		}
		return (
			AnimeTypesData.map((type, index) => (
				<li
					key={index}
					onClick={() => handleTypeChange(index)}
					className={styles[(selectedTypeIndex) === index ? 'active' : '']}
				>
					{translateDropdownContent(type, DropDownTypeEnum.TYPES)}
				</li>
			))
		)

	}, [selectedTypeIndex, AnimeTypesData, dispatch])

	return <>{getTypeDropdown}</>
}

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { orderByFilterActions } from "../../../../../store/reducers/Filters/OrderFilterSlice";
import { DropDownTypeEnum } from "../../../../../utils/DataTypes/AnimeData";
import { translateDropdownContent } from "../../TranslateDropdown";

import styles from '../FilterDropdown.styles.module.scss';
export const OrderByDropdown = () => {

	const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(null);

	const orderBy = [
		'score',
		'popularity',
		'rank',
		'scored_by',
		'favorites',
		'members',
		'mal_id',
		'title',
		'type',
		'rating',
		'episodes',
		'start_date',
		'end_date',
	];

	const dispatch = useDispatch();

	const getOrderDropdown = useMemo(() => {

		const handleOrderChange = (index: number) => {
			dispatch(orderByFilterActions.setOrderBy(orderBy[index]));
			setSelectedOrderIndex(index)
		}
		return (
			orderBy.map((order, index) => (
				<li
					key={index}
					onClick={() => handleOrderChange(index)}
					className={styles[(selectedOrderIndex) === index ? 'active' : '']}>
					{translateDropdownContent(order, DropDownTypeEnum.ORDER)}
				</li>
			))
		)
	}, [selectedOrderIndex, orderBy])

	return <>{getOrderDropdown}</>
}

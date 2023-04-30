import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { statusFilterActions } from "../../../../../store/reducers/Filters/StatusFilterSlice";
import { translateDropdownContent } from "../../TranslateDropdown";
import styles from './StatusDropdown.styles.module.scss';
import { DropDownTypeEnum } from "../../../../../utils/DataTypes/AnimeData";


export const StatusDropdown = () => {


	const [selectedStatusIndex, setSelectedStatusIndex] = useState<number | null>(null);

	const statusData = ['airing', 'complete', 'upcoming'];

	const dispatch = useDispatch();

	const getSeasonsDropdown = useMemo(() => {

		const handleStatusChange = (index: number, selectedStatus: number | null) => {
			if (index === selectedStatus) {
				dispatch(statusFilterActions.setStatus(null));
				setSelectedStatusIndex(null)
			} else {
				dispatch(statusFilterActions.setStatus(statusData[index]));
				setSelectedStatusIndex(index)
			}
			console.log(selectedStatusIndex)
			console.log(index)
		}
		return (
			statusData.map((status, index) => (
				<li
					key={index}
					onClick={() => handleStatusChange(index, selectedStatusIndex)}
					className={styles[(selectedStatusIndex) === index ? 'active' : '']}>
					{translateDropdownContent(status, DropDownTypeEnum.STATUS)}
				</li>
			))
		)
	}, [selectedStatusIndex, statusData,])

	return <>{getSeasonsDropdown}</>
}

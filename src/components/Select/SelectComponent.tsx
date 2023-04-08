
import Dropdown from '../../assets/icons/dropdown.svg';
import styles from './SelectComponent.styles.module.scss';

interface SelectComponentProps {
	title: string;
	tooltip: string;
}


export const SelectComponent: React.FC<SelectComponentProps> = ({ title, tooltip }) => {
	return (
		<button className={styles['selectComponent']}>
			<p>{title}</p>
			<div className={styles['selectComponent-container']}>
				<p>{tooltip}</p>
				<img src={Dropdown} width={12} alt='Выпадающее меню' />
			</div>
			<div className={styles['selectComponent-dropdown']}>
				<ul className={styles['dropdown-list']}>
					<li><input type='checkbox'></input>Экшен</li>
				</ul>
			</div>
		</button>
	)
}

import { useMemo, useState } from 'react';

import { useAppDispatch } from 'hooks/redux';
import { orderByFilterActions } from 'store/reducers/Filters/OrderFilterSlice';
import { DropdownTypeEnum } from 'utils/DataTypes/AnimeData';
import { translateDropdownContent } from '../../TranslateDropdown';
import styles from '../FilterDropdown.styles.module.scss';

export const OrderByDropdown = () => {
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);

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

  const dispatch = useAppDispatch();

  const getOrderDropdown = useMemo(() => {
    const handleOrderChange = (index: number) => {
      dispatch(orderByFilterActions.setOrderBy(orderBy[index]));
      setSelectedOrderIndex(index);
    };
    return orderBy.map((order, index) => (
      <li
        key={index}
        onClick={() => handleOrderChange(index)}
        className={styles[selectedOrderIndex === index ? 'active' : '']}
      >
        {translateDropdownContent(order, DropdownTypeEnum.ORDER)}
      </li>
    ));
  }, [selectedOrderIndex, orderBy]);

  return <>{getOrderDropdown}</>;
};

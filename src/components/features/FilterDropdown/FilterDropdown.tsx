import { Select } from '@components/features'
import { DropdownTypeEnum } from '@utils/constants/AnimeData'
import { useTranslation } from 'react-i18next'
import {
  GenresDropdown,
  TypeDropdown,
  RatingDropdown,
  SeasonsDropdown,
  ProducersDropdown,
  StatusDropdown,
  SortDropdown,
  OrderbyDropdown,
} from '../DropdownContent'

export const FilterDropdown = () => {
  const { t } = useTranslation()

  const filterDropdown = [
    {
      id: 0,
      title: t('filter_genres'),
      tooltip: t('filter_genres_placeholder'),
      type: DropdownTypeEnum.GENRES,
      element: GenresDropdown,
    },
    {
      id: 1,
      title: t('filter_types'),
      tooltip: t('filter_types_placeholder'),
      type: DropdownTypeEnum.TYPES,
      element: TypeDropdown,
    },
    {
      id: 2,
      title: t('filter_rating'),
      tooltip: t('filter_rating_placeholder'),
      type: DropdownTypeEnum.RATING,
      element: RatingDropdown,
    },
    {
      id: 3,
      title: t('filter_seasons'),
      tooltip: t('filter_seasons_placeholder'),
      type: DropdownTypeEnum.SEASON,
      element: SeasonsDropdown,
    },
    {
      id: 4,
      title: t('filter_producers'),
      tooltip: t('filter_producers_placeholder'),
      type: DropdownTypeEnum.PRODUCER,
      element: ProducersDropdown,
    },
    {
      id: 5,
      title: t('filter_status'),
      tooltip: t('filter_status_placeholder'),
      type: DropdownTypeEnum.STATUS,
      element: StatusDropdown,
    },
    {
      id: 6,
      title: t('filter_sort'),
      tooltip: 'sort',
      type: DropdownTypeEnum.SORT,
      element: SortDropdown,
    },
    {
      id: 7,
      title: t('filter_order'),
      tooltip: 'order',
      type: DropdownTypeEnum.ORDER,
      element: OrderbyDropdown,
    },
  ]
  return (
    <>
      {filterDropdown.map((dropdown) => (
        <Select key={dropdown.id} dropdownData={dropdown} />
      ))}
    </>
  )
}

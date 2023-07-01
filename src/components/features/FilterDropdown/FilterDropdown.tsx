import { Select } from '@components/features'
import { DropdownTypeEnum } from '@utils/constants/AnimeData'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GenresDropdown,
  OrderbyDropdown,
  ProducersDropdown,
  RatingDropdown,
  SeasonsDropdown,
  SortDropdown,
  StatusDropdown,
  TypeDropdown,
} from '../DropdownContent'

export const FilterDropdown = memo(() => {
  const { t } = useTranslation()

  const filterDropdown = [
    {
      id: 0,
      title: t('filter_genres'),
      type: DropdownTypeEnum.GENRES,
      element: GenresDropdown,
    },
    {
      id: 1,
      title: t('filter_types'),
      type: DropdownTypeEnum.TYPES,
      element: TypeDropdown,
    },
    {
      id: 2,
      title: t('filter_rating'),
      type: DropdownTypeEnum.RATING,
      element: RatingDropdown,
    },
    {
      id: 3,
      title: t('filter_seasons'),
      type: DropdownTypeEnum.SEASON,
      element: SeasonsDropdown,
    },
    {
      id: 4,
      title: t('filter_producers'),
      type: DropdownTypeEnum.PRODUCER,
      element: ProducersDropdown,
    },
    {
      id: 5,
      title: t('filter_status'),
      type: DropdownTypeEnum.STATUS,
      element: StatusDropdown,
    },
    {
      id: 6,
      title: t('filter_sort'),
      type: DropdownTypeEnum.SORT,
      element: SortDropdown,
    },
    {
      id: 7,
      title: t('filter_order'),
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
})

import React from 'react'
import { DropdownTypeEnum } from 'utils/DataTypes/AnimeData'
import {
  GenresDropdown,
  OrderbyDropdown,
  ProducersDropdown,
  RatingDropdown,
  SeasonsDropdown,
  SortDropdown,
  StatusDropdown,
  TypeDropdown,
} from './FilterDropdowns'

interface SelectDropdownProps {
  dropdownType: string
}

export const SelectDropdownRedirect: React.FC<SelectDropdownProps> = ({
  dropdownType,
}) => {
  const renderDropdown = () => {
    switch (dropdownType) {
      case DropdownTypeEnum.GENRES:
        return <GenresDropdown />
      case DropdownTypeEnum.TYPES:
        return <TypeDropdown />
      case DropdownTypeEnum.RATING:
        return <RatingDropdown />
      case DropdownTypeEnum.SEASON:
        return <SeasonsDropdown />
      case DropdownTypeEnum.PRODUCER:
        return <ProducersDropdown />
      case DropdownTypeEnum.STATUS:
        return <StatusDropdown />
      case DropdownTypeEnum.SORT:
        return <SortDropdown />
      case DropdownTypeEnum.ORDER:
        return <OrderbyDropdown />
    }
  }

  return renderDropdown() || undefined || null
}

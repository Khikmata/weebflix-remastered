import React from 'react'
import { OrderByDropdown } from './FilterDropdowns/OrderByDropdown'
import { SeasonsDropdown } from './FilterDropdowns/SeasonsDropdown'
import { SortDropdown } from './FilterDropdowns/SortDropdown'
import { StatusDropdown } from './FilterDropdowns/StatusDropdown'

import { DropdownTypeEnum } from '../../../utils/DataTypes/AnimeData'
import { GenresDropdown } from './FilterDropdowns/GenresDropdown/GenresDropdown'
import { ProducersDropdown } from './FilterDropdowns/ProducersDropdown'
import { RatingDropdown } from './FilterDropdowns/RatingDropdown'
import { TypeDropdown } from './FilterDropdowns/TypeDropdown'
interface SelectDropdownProps {
  dropdownType: string
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({ dropdownType }) => {

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
        return <OrderByDropdown />
    }
  }

  return renderDropdown() || undefined || null
}

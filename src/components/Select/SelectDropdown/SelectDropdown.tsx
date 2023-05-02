import React from 'react'
import { OrderByDropdown } from './FilterDropdowns/OrderByDropdown'
import { SeasonsDropdown } from './FilterDropdowns/SeasonsDropdown'
import { SortDropdown } from './FilterDropdowns/SortDropdown'
import { StatusDropdown } from './FilterDropdowns/StatusDropdown'

import { DropDownTypeEnum } from '../../../utils/DataTypes/AnimeData'
import { GenresDropdown } from './FilterDropdowns/GenresDropdown/GenresDropdown'
import { ProducersDropdown } from './FilterDropdowns/ProducersDropdown'
import { RatingDropdown } from './FilterDropdowns/RatingDropdown'
import { TypeDropdown } from './FilterDropdowns/TypeDropdown'
interface SelectDropdownProps {
  dropDownType: string
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({ dropDownType }) => {

  const renderDropDown = () => {
    switch (dropDownType) {
      case DropDownTypeEnum.GENRES:
        return <GenresDropdown />
      case DropDownTypeEnum.TYPES:
        return <TypeDropdown />
      case DropDownTypeEnum.RATING:
        return <RatingDropdown />
      case DropDownTypeEnum.SEASON:
        return <SeasonsDropdown />
      case DropDownTypeEnum.PRODUCER:
        return <ProducersDropdown />
      case DropDownTypeEnum.STATUS:
        return <StatusDropdown />
      case DropDownTypeEnum.SORT:
        return <SortDropdown />
      case DropDownTypeEnum.ORDER:
        return <OrderByDropdown />
    }
  }

  return renderDropDown() || undefined || null
}

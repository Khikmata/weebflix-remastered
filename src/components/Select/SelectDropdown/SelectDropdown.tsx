import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { genreFilterActions, typeFilterActions } from '../../../store/reducers/Filters'
import { OrderByDropdown } from './FilterDropdowns/OrderByDropdown'
import { SeasonsDropdown } from './FilterDropdowns/SeasonsDropdown'
import { SortDropdown } from './FilterDropdowns/SortDropdown'
import { StatusDropdown } from './FilterDropdowns/StatusDropdown'

import { DropDownTypeEnum } from '../../../utils/DataTypes/AnimeData'
import { ProducersDropdown } from './FilterDropdowns/ProducersDropdown'
import { RatingDropdown } from './FilterDropdowns/RatingDropdown'
import { TypeDropdown } from './FilterDropdowns/TypeDropdown'
import { translateDropdownContent } from './TranslateDropdown'
interface SelectDropdownProps {
  dropDownType: string
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({ dropDownType }) => {
  const dispatch = useAppDispatch()

  const genresData = useAppSelector((state) => state.dropDownData.genreData)

  const sortedAnimeGenres = useMemo(() => {
    if (dropDownType === DropDownTypeEnum.GENRES) {
      if (genresData) {
        return [...genresData]?.sort((a, b) => b.count - a.count)
      }
    }
    return genresData
  }, [genresData, dropDownType])

  const handleCheckBoxChange = (
    item: any,
    event: React.FormEvent<HTMLInputElement>,
    i?: number | null,
  ) => {
    if (dropDownType === DropDownTypeEnum.GENRES) {
      const action = event.currentTarget.checked
        ? genreFilterActions.setGenre(item)
        : genreFilterActions.removeGenre(item)
      dispatch(action)
    }
    if (dropDownType === DropDownTypeEnum.TYPES) {
      if (event.currentTarget.checked) {
        return dispatch(typeFilterActions.setType(item))
      } else {
        return dispatch(typeFilterActions.removeType(item))
      }
    }
  }
  const dropDownContent = (animeData: any) => {
    return (
      <>
        {animeData &&
          animeData.map((item: any, index: number) => (
            <label key={index}>
              <li>
                <input
                  onChange={(event) => handleCheckBoxChange(item, event)}
                  value={0}
                  onClick={(e) =>
                    e.currentTarget.checked ? e.currentTarget.checked : e.currentTarget.checked
                  }
                  name={dropDownType}
                  type={dropDownType === DropDownTypeEnum.GENRES ? 'checkbox' : 'radio'}
                />
                {dropDownType === DropDownTypeEnum.GENRES &&
                  translateDropdownContent(
                    `${item.name} (${item.count && item.count})`,
                    dropDownType,
                  )}
                {(dropDownType === DropDownTypeEnum.TYPES ||
                  dropDownType === DropDownTypeEnum.RATING) &&
                  translateDropdownContent(item, dropDownType)}
              </li>
            </label>
          ))}
      </>
    )
  }

  const renderDropDown = () => {
    switch (dropDownType) {
      case DropDownTypeEnum.GENRES:
        return dropDownContent(sortedAnimeGenres)
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

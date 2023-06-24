import { useMemo } from 'react'

import styles from '../FilterDropdown.styles.module.scss'

import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { ratingFilterActions } from 'store/reducers/Filters'
import { IDropdownItem } from 'types/DetailsTypes'
import { AnimeRatingData } from 'utils/DataTypes/AnimeData'

export const RatingDropdown = () => {
  const activeRating = useAppSelector((state) => state.filterReducer.ratingFilters.ratingDisplay)
  const dispatch = useAppDispatch()

  const getRatingDropdown = useMemo(() => {
    const handleRatingChange = (rating: IDropdownItem) => {
      if (rating.value === activeRating) {
        dispatch(ratingFilterActions.removeRating())
      } else {
        dispatch(ratingFilterActions.setRating(AnimeRatingData[rating.id]))
      }
      console.log(rating.value, activeRating)
    }
    return AnimeRatingData.map((rating) => (
      <li
        key={rating.id}
        onClick={() => handleRatingChange(rating)}
        className={styles[rating.value === activeRating ? 'active' : '']}
      >
        {rating.value}
      </li>
    ))
  }, [activeRating, dispatch])

  return <>{getRatingDropdown}</>
}

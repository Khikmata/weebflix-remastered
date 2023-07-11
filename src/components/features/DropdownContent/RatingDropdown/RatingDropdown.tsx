import { memo, useCallback } from 'react'

import styles from '../DropdownContentShared.styles.module.scss'

import { IDropdownItem } from '@store/types/DetailsTypes'
import { AnimeRatingData } from '@utils/constants/AnimeData'
import { TranslateRating } from '@utils/i18n'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { ratingFilterActions } from 'store/reducers/Filters'

export const RatingDropdown = memo(() => {
  const activeRating = useAppSelector(
    (state) => state.filter.ratingFilters.ratingDisplay,
  )
  const dispatch = useAppDispatch()

  const handleRatingChange = useCallback(
    (rating: IDropdownItem) => {
      if (rating.value === activeRating) {
        dispatch(ratingFilterActions.removeRating())
      } else {
        dispatch(ratingFilterActions.setRating(AnimeRatingData[rating.id]))
      }
    },
    [activeRating, dispatch],
  )

  return (
    <>
      {AnimeRatingData.map((rating) => (
        <li
          key={rating.id}
          onClick={() => handleRatingChange(rating)}
          className={styles[rating.value === activeRating ? 'active' : '']}
        >
          {TranslateRating(rating.value)}
        </li>
      ))}
    </>
  )
})

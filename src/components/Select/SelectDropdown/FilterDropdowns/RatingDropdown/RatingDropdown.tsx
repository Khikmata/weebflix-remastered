import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnimeRatingData, DropDownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import { ratingFilterActions } from '../../../../../store/reducers/Filters'
import { TranslateRatingToRussian } from '../../../../../utils/Translation/TranslateRating'
import styles from '../FilterDropdown.styles.module.scss'


export const RatingDropdown = () => {
  const [selectedRatingIndex, setSelectedRatingIndex] = useState<number | null>(null)

  const dispatch = useDispatch()

  const getRatingDropdown = useMemo(() => {
    const handleRatingChange = (index: number) => {
      if (index === selectedRatingIndex) {
        dispatch(ratingFilterActions.removeRating())
        setSelectedRatingIndex(null)
      } else {
        dispatch(ratingFilterActions.setRating(TranslateRatingToRussian(AnimeRatingData[index])))
        setSelectedRatingIndex(index)
      }
    }
    return AnimeRatingData.map((rating, index) => (
      <li
        key={index}
        onClick={() => handleRatingChange(index)}
        className={styles[selectedRatingIndex === index ? 'active' : '']}
      >
        {translateDropdownContent(rating, DropDownTypeEnum.RATING)}
      </li>
    ))
  }, [selectedRatingIndex, AnimeRatingData, dispatch])

  return <>{getRatingDropdown}</>
}

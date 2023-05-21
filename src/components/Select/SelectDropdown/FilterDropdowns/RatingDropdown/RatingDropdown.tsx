import { useMemo, useState } from 'react'
import { AnimeRatingData, DropdownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import { useAppDispatch } from '../../../../../hooks/redux'
import { ratingFilterActions } from '../../../../../store/reducers/Filters'
import { TranslateRatingToRussian } from '../../../../../utils/Translation/TranslateRating'
import styles from '../FilterDropdown.styles.module.scss'


export const RatingDropdown = () => {
  const [selectedRatingIndex, setSelectedRatingIndex] = useState<number | null>(null)

  const dispatch = useAppDispatch()

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
        {translateDropdownContent(rating, DropdownTypeEnum.RATING)}
      </li>
    ))
  }, [selectedRatingIndex, AnimeRatingData, dispatch])

  return <>{getRatingDropdown}</>
}

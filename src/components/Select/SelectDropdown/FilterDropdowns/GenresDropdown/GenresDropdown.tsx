import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { DropDownTypeEnum } from '../../../../../utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'

import { useAppSelector } from '../../../../../hooks/redux'
import { genreFilterActions } from '../../../../../store/reducers/Filters'
import styles from '../FilterDropdown.styles.module.scss'


export const GenresDropdown = () => {
  const [selectedGenreIndex, setSelectedGenreIndex] = useState<number[]>([])

  const genreData = useAppSelector((state) => state.dropDownData.genreData)
  const dispatch = useDispatch()

  const sortedGenres = [...genreData]?.sort((a, b) => b.count - a.count)

  const getGenreDropdown = useMemo(() => {

    const handleGenreChange = (index: number) => {

      if (selectedGenreIndex.includes(index)) {
        dispatch(genreFilterActions.removeGenre(sortedGenres[index]))
        selectedGenreIndex.splice(selectedGenreIndex.indexOf(index), 1);
      } else {
        dispatch(genreFilterActions.setGenre(sortedGenres[index]))
        setSelectedGenreIndex(state => [...state, index])
      }
    }

    return sortedGenres.map((genre, index: number) => (
      <li
        key={index}
        onClick={() => handleGenreChange(index)}
        className={styles[selectedGenreIndex.includes(index) ? 'active' : '']}
      >
        {translateDropdownContent(genre.name, DropDownTypeEnum.GENRES)}
        {` (${genre.count})`}
      </li>
    ))
  }, [selectedGenreIndex, sortedGenres])

  return <>{getGenreDropdown}</>
}

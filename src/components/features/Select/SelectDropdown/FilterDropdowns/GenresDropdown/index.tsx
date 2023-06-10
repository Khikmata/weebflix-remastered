import { useMemo, useState } from 'react'


import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { genreFilterActions } from 'store/reducers/Filters'
import styles from '../FilterDropdown.styles.module.scss'
import { DropdownTypeEnum } from 'utils/DataTypes/AnimeData'
import { translateDropdownContent } from '../../TranslateDropdown'


export const GenresDropdown = () => {
  const [selectedGenreIndex, setSelectedGenreIndex] = useState<number[]>([])
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0)
  const genreData = useAppSelector((state) => state.dropdownData.genreData)
  const dispatch = useAppDispatch()

  const sortedGenres = [...genreData]?.sort((a, b) => b.count - a.count)

  const getGenreDropdown = useMemo(() => {

    const handleGenreChange = (index: number) => {
      if (selectedGenreIndex.includes(index)) {
        dispatch(genreFilterActions.removeGenre(sortedGenres[index]))
        selectedGenreIndex.splice(selectedGenreIndex.indexOf(index), 1);
        setSelectedTypeIndex(0)
      }
      else {
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
        {translateDropdownContent(genre.name, DropdownTypeEnum.GENRES)}
        {` (${genre.count})`}
      </li>
    ))
  }, [selectedGenreIndex, sortedGenres])

  return <>{getGenreDropdown}</>
}

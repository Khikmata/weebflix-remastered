import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { genreFilterActions } from 'store/reducers/Filters'
import styles from '../FilterDropdown.styles.module.scss'
import { SortGenres } from './helpers/SortGenres'

export const GenresDropdown = () => {
  //const [selectedGenreIndex, setSelectedGenreIndex] = useState<number[]>([])
  const selectedGenresIndexes = useAppSelector(
    (state) => state.filterReducer.genreFilters.selectedGenresIndexes,
  )
  // Список жанров
  const genreData = useAppSelector((state) => state.dropdownData.genreData)
  const dispatch = useAppDispatch()

  //Сортировка жанров по попу лярности
  const sortedGenres = SortGenres(genreData)

  const getGenreDropdown = useMemo(() => {
    const handleGenreChange = (index: number) => {
      //Если текущий жанр находится в локальном массиве жанров, то он удаляется из стора и из локального массива
      if (selectedGenresIndexes.includes(index)) {
        dispatch(
          genreFilterActions.removeGenre(
            sortedGenres.find((genre) => genre.mal_id === index)!,
          ),
        )
      }
      //Отправка конкретеного жанра в стор и добавление в локальный массив
      else {
        dispatch(
          genreFilterActions.setGenre(
            sortedGenres.find((genre) => genre.mal_id === index)!,
          ),
        )
      }
    }
    //Рендер отсортированных жанров в дропдауне
    return sortedGenres.map((genre) => (
      <li
        key={genre.mal_id}
        onClick={() => handleGenreChange(genre.mal_id)}
        className={
          styles[selectedGenresIndexes.includes(genre.mal_id) ? 'active' : '']
        }
      >
        {genre.name + ` (${genre.count})`}
      </li>
    ))
  }, [selectedGenresIndexes, sortedGenres])

  return <>{getGenreDropdown}</>
}

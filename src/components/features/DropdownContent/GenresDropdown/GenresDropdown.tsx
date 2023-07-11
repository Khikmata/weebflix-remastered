import { memo, useCallback, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { genreFilterActions } from 'store/reducers/Filters'
import styles from '../DropdownContentShared.styles.module.scss'
import { SortGenres } from './constants'

export const GenresDropdown = memo(() => {
  const selectedGenresIndexes = useAppSelector(
    (state) => state.filter.genreFilters.selectedGenresIndexes,
  )
  // Список жанров
  const genreData = useAppSelector((state) => state.dropdownData.genreData)
  const dispatch = useAppDispatch()
  //Сортировка жанров по попу лярности
  const sortedGenres = SortGenres(genreData)

  const handleGenreChange = useCallback(
    (index: number) => {
      //Если текущий жанр уже находится в локальном массиве жанров, то он удаляется из стора и из локального массива
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
    },
    [dispatch, selectedGenresIndexes, sortedGenres],
  )

  //Рендер отсортированных жанров в дропдауне
  return useMemo(() => {
    return (
      <>
        {sortedGenres.map((genre) => (
          <li
            key={genre.mal_id}
            onClick={() => handleGenreChange(genre.mal_id)}
            className={
              styles[
                selectedGenresIndexes.includes(genre.mal_id) ? 'active' : ''
              ]
            }
          >
            {genre.name + ` (${genre.count})`}
          </li>
        ))}
      </>
    )
  }, [selectedGenresIndexes, sortedGenres, handleGenreChange])
})

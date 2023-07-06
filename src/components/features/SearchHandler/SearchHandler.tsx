import closeIcon from '@assets/icons/CloseIcon.svg'
import searchIcon from '@assets/icons/SearchIcon.svg'
import { searchFilterActions } from '@store/reducers/Filters'
import { useAppDispatch } from 'hooks/redux'
import { useDebounce } from 'hooks/useDebounce'
import { memo, useEffect, useRef, useState } from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import styles from './SearchHandler.styles.module.scss'

export const SearchHandler = memo(() => {
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearchButton = () => {
    if (searchOpen) {
      handleSearchClear()
    }
    setSearchOpen(!searchOpen)
    searchRef.current?.focus()
  }
  const handleSearchClear = () => {
    setSearchInput('')
  }
  const updateSearchInputStore = useDebounce(() => {
    dispatch(searchFilterActions.setSearchQuery(searchInput))
  }, 500)

  useEffect(() => {
    updateSearchInputStore(searchInput)
    console.log(searchInput)
  }, [searchInput, updateSearchInputStore])
  return (
    <>
      <SearchBar searchOpen={searchOpen} showTransition={true} />
      <button type="button" onClick={handleSearchButton}>
        <img
          className={[
            styles['search-open'],
            styles[searchOpen ? '' : 'active'],
          ].join(' ')}
          width={32}
          src={searchIcon}
          alt="Поиск"
        ></img>
        <img
          className={[
            styles['search-close'],
            styles[searchOpen ? 'active' : ''],
          ].join(' ')}
          width={32}
          src={closeIcon}
          alt="Закрыть"
        />
      </button>
    </>
  )
})

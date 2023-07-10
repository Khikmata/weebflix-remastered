import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'
import { ReactComponent as SearchIcon } from '@assets/icons/SearchIcon.svg'
import { searchFilterActions } from '@store/reducers/Filters'
import { useAppDispatch } from 'hooks/redux'
import { useDebounce } from 'hooks/useDebounce'
import { memo, useEffect, useRef, useState } from 'react'
import { SearchBar } from '../SearchBar/SearchBar'

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
  }, [searchInput, updateSearchInputStore])
  return (
    <>
      <SearchBar searchOpen={searchOpen} showTransition={true} />
      <button type="button" onClick={handleSearchButton}>
        {searchOpen ? <CloseIcon /> : <SearchIcon />}
      </button>
    </>
  )
})

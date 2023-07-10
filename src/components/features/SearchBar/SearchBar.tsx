import { ReactComponent as ForwardIcon } from '@assets/icons/ForwardIcon.svg'
import { searchFilterActions } from '@store/reducers/Filters'
import { useAppDispatch } from 'hooks/redux'
import { useDebounce } from 'hooks/useDebounce'
import { memo, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SearchBar.styles.module.scss'

interface SearchBarProps {
  searchOpen: boolean
  showTransition: boolean
}

export const SearchBar = memo(
  ({ searchOpen, showTransition }: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState('')

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const searchRef = useRef<HTMLInputElement>(null)
    const redirectToSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      navigate('/search')
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
        <form
          onSubmit={(e) => redirectToSearch(e)}
          className={styles['search-container']}
        >
          <input
            ref={searchRef}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={[
              styles['search-bar'],
              styles[searchOpen ? 'active' : ''],
            ].join(' ')}
            placeholder="Поиск..."
          />
          <Link
            to={'/search'}
            type="button"
            className={[
              styles['search-bar__next'],
              styles[searchOpen ? 'active' : ''],
            ].join(' ')}
            onClick={handleSearchClear}
          >
            {showTransition && <ForwardIcon />}
          </Link>
        </form>
      </>
    )
  },
)

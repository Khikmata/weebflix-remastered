import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/icons/logo.svg'

import closeIcon from '../../../assets/icons/close.svg'
import forwardIcon from '../../../assets/icons/forward.svg'

import profileIcon from '../../../assets/icons/profile.svg'
import searchIcon from '../../../assets/icons/search.svg'

import { useDispatch } from 'react-redux'

import { useDebounce } from '../../../hooks/debounce'
import { searchFilterActions } from '../../../store/reducers/Filters'
import styles from './Navbar.styles.module.scss'

export const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const dispatch = useDispatch()
  const searchRef = useRef<HTMLInputElement>(null)


  const updateSearchInputStore = useCallback(useDebounce(() => {
    console.log('yey')
    dispatch(searchFilterActions.setSearchQuery(searchInput))
  }, 500), [searchInput, dispatch])


  const handleSearchClear = () => {
    setSearchInput('')
  }

  const handleSearchButton = () => {
    if (searchOpen) {
      handleSearchClear();
    }
    setSearchOpen(!searchOpen)
    searchRef.current?.focus()
  }

  useEffect(() => {
    updateSearchInputStore(searchInput);
  }, [searchInput])




  const renderNavbar = useMemo(() => {
    return (
      <Link to={'/'} className={styles['navbar-logo']}>
        <img src={logo} alt={'Главная'} />
      </Link>
    )
  }, [])

  const renderSearch = useMemo(() => {
    return (
      <>
        <div className={styles['search-container']}>
          <input
            ref={searchRef}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={[styles['search-bar'], styles[searchOpen ? 'active' : '']].join(' ')}
            placeholder="Поиск..."
          />
          <Link
            to={'/search'}
            type="button"
            className={[styles['search-bar__next'], styles[searchOpen ? 'active' : '']].join(' ')}
            onClick={handleSearchClear}
          >
            <img width={12} src={forwardIcon} alt="Очистить"></img>
          </Link>
        </div>
        <button type="button" onClick={handleSearchButton}>
          <img
            className={[styles['search-open'], styles[searchOpen ? '' : 'active']].join(' ')}
            width={32}
            src={searchIcon}
            alt="Поиск"
          ></img>
          <img
            className={[styles['search-close'], styles[searchOpen ? 'active' : '']].join(' ')}
            width={32}
            src={closeIcon}
            alt="Закрыть"
          />
        </button>
      </>
    )
  }, [searchOpen])


  return (
    <header className={styles['navbar']}>
      <nav className={styles['navbar-content']}>
        {renderNavbar}
        <div className={styles['navbar-auth']}>
          <div className={styles['profile']}>
            <button type="button"></button>
            <img width={32} src={profileIcon} alt="Профиль"></img>
          </div>
          {renderSearch}
        </div>
      </nav>
    </header>
  )
}

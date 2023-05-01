import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'

import closeIcon from '../../assets/icons/close.svg'
import forwardIcon from '../../assets/icons/forward.svg'

import profileIcon from '../../assets/icons/profile.svg'
import searchIcon from '../../assets/icons/search.svg'

import { useDispatch } from 'react-redux'

import styles from './Navbar.styles.module.scss'
import { searchFilterActions } from '../../store/reducers/Filters'

export const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const dispatch = useDispatch()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
      dispatch(searchFilterActions.setSearchQuery(e.target.value))
    },
    [dispatch, setSearchInput, searchInput],
  )

  const handleSearchClear = () => {
    setSearchInput('')
  }

  const handleSearchButton = () => {
    setSearchOpen(!searchOpen)
    searchRef.current?.focus()
  }

  return (
    <header className={styles['navbar']}>
      <nav className={styles['navbar-content']}>
        <Link to={'/'} className={styles['navbar-logo']}>
          <img src={logo} alt={'Главная'} />
        </Link>
        <div className={styles['navbar-auth']}>
          <div className={styles['profile']}>
            <button type="button"></button>
            <img width={32} src={profileIcon} alt="Профиль"></img>
          </div>
          <div className={styles['search-container']}>
            <input
              ref={searchRef}
              value={searchInput}
              onChange={handleSearchInputChange}
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
        </div>
      </nav>
    </header>
  )
}

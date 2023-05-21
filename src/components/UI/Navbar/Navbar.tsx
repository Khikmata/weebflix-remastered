import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/icons/logo.svg'

import closeIcon from '../../../assets/icons/close.svg'
import forwardIcon from '../../../assets/icons/forward.svg'

import profileIcon from '../../../assets/icons/profile.svg'
import searchIcon from '../../../assets/icons/search.svg'


import { useDebounce } from '../../../hooks/debounce'
import { useAppDispatch } from '../../../hooks/redux'
import { searchFilterActions } from '../../../store/reducers/Filters'
import styles from './Navbar.styles.module.scss'
import { authModalAction } from '../../../store/reducers/Auth/AuthModal'

export const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  const updateSearchInputStore = useDebounce(() => {
    dispatch(searchFilterActions.setSearchQuery(searchInput))
  }, 500)


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




  const renderLogo = useMemo(() => {
    return (
      <Link to={'/'} className={styles['navbar-logo']}>
        <img src={logo} alt={'Главная'} />
      </Link>
    )
  }, [])

  const redirectToSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/search')
  }

  const handleAuthModal = () => {
    dispatch(authModalAction.setModalOpen(true))
  }


  return (
    <header className={styles['navbar']}>
      <nav className={styles['navbar-content']}>
        {renderLogo}
        <div className={styles['navbar-auth']}>
          <button onClick={handleAuthModal} className={styles['profile']}>
            <img width={32} src={profileIcon} alt="Профиль"></img>
          </button>
          <form onSubmit={(e) => redirectToSearch(e)} className={styles['search-container']}>
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
          </form>
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

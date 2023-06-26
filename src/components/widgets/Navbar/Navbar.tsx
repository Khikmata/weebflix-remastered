import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import closeIcon from '@assets/icons/CloseIcon.svg'
import forwardIcon from '@assets/icons/ForwardIcon.svg'
import languageIcon from '@assets/icons/LanguageIcon.svg'
import logoIcon from '@assets/icons/LogoIcon.svg'
import profileIcon from '@assets/icons/ProfileIcon.svg'
import searchIcon from '@assets/icons/SearchIcon.svg'

import { authModalAction } from '@store/reducers/Auth/AuthModal'
import { searchFilterActions } from '@store/reducers/Filters'
import { useDebounce } from 'hooks/useDebounce'
import { useAppDispatch } from 'hooks/redux'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.styles.module.scss'

export const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const { i18n } = useTranslation()

  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const updateSearchInputStore = useDebounce(() => {
    dispatch(searchFilterActions.setSearchQuery(searchInput))
  }, 500)

  const handleLanguageChange = () => {
    currentLanguage === 'en'
      ? setCurrentLanguage('ru')
      : setCurrentLanguage('en')
  }
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')

  const handleSearchClear = () => {
    setSearchInput('')
  }

  const handleSearchButton = () => {
    if (searchOpen) {
      handleSearchClear()
    }
    setSearchOpen(!searchOpen)
    searchRef.current?.focus()
  }

  useEffect(() => {
    updateSearchInputStore(searchInput)
    i18n.changeLanguage(currentLanguage)
  }, [currentLanguage])

  const renderLogo = useMemo(() => {
    return (
      <Link to={'/'} className={styles['navbar-logo']}>
        <img src={logoIcon} alt={'Главная'} />
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
          <button className={styles['language']} onClick={handleLanguageChange}>
            <img width={32} src={languageIcon} alt="смена языка" />
          </button>
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
              <img width={12} src={forwardIcon} alt="Очистить"></img>
            </Link>
          </form>
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
        </div>
      </nav>
    </header>
  )
}

import { useCallback, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/icons/logo.svg'

import closeIcon from '../../assets/icons/close.svg'
import eraseIcon from '../../assets/icons/erase.svg'
import profileIcon from '../../assets/icons/profile.svg'
import searchIcon from '../../assets/icons/search.svg'

import { useDispatch } from 'react-redux'
import { SearchFilterActions } from '../../store/reducers/SearchFilterSlice'
import styles from './Navbar.styles.module.scss'

export const Navbar = () => {
	const [searchInput, setSearchInput] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);

	const dispatch = useDispatch()
	const searchRef = useRef<HTMLInputElement>(null)

	const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
		dispatch(SearchFilterActions.setSearchQuery(e.target.value));
		console.log(searchInput);
	}, [dispatch, setSearchInput, searchInput]);


	const handleSearchClear = () => {
		setSearchInput('')
	}

	const handleSearchButton = () => {
		setSearchOpen(!searchOpen);
		searchRef.current?.focus();
	}

	return (
		<header className={styles['navbar']}>
			<nav className={styles['navbar-content']}>
				<Link to={'/'} className={styles['navbar-logo']}>
					<img src={logo} alt={"Главная"} />
				</Link>
				<Link to={'/'} className={styles['navbar-auth']}>
					<img className={styles['profile']} width={24} src={profileIcon} alt="Профиль"></img>
					<div className={styles['search-container']} >
						<input ref={searchRef} value={searchInput} onChange={handleSearchInputChange} className={[styles['search-bar'], styles[searchOpen ? 'active' : '']].join(' ')} placeholder='Поиск...' />
						<button type='button' className={[styles['search-bar__clear'], styles[searchOpen ? 'active' : '']].join(' ')} onClick={handleSearchClear}><img width={16} src={eraseIcon} alt='Очистить'></img></button>
					</div>
					<button type="button" onClick={handleSearchButton}>
						<img className={[styles['search-open'], styles[searchOpen ? '' : 'active']].join(' ')} width={24} src={searchIcon} alt="Поиск"></img>
						<img className={[styles['search-close'], styles[searchOpen ? 'active' : '']].join(' ')} width={24} src={closeIcon} alt="Закрыть" />
					</button>
				</Link>
			</nav>
		</header >
	)
}


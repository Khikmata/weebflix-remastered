import { useState } from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/icons/logo.svg'

import closeIcon from '../../assets/icons/close.svg'
import profileIcon from '../../assets/icons/profile.svg'
import searchIcon from '../../assets/icons/search.svg'

import styles from './Navbar.styles.module.scss'

export const Navbar = () => {
	const [searchInput, setSearchInput] = useState('');
	const [searchOpen, setSearchOpen] = useState(false);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
		console.log(searchInput)
	}
	const handleSearchClear = () => {
		setSearchInput('')
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
						<input value={searchInput} onChange={handleSearchInput} className={[styles['search-bar'], styles[searchOpen ? 'active' : '']].join(' ')} placeholder='Поиск...' />
						<button type='button' className={[styles['search-bar__clear'], styles[searchOpen ? 'active' : '']].join(' ')} onClick={handleSearchClear}>x</button>
					</div>
					<button type="button" onClick={() => setSearchOpen(!searchOpen)}>
						<img className={[styles['search-open'], styles[searchOpen ? '' : 'active']].join(' ')} width={24} src={searchIcon} alt="Поиск"></img>
						<img className={[styles['search-close'], styles[searchOpen ? 'active' : '']].join(' ')} width={24} src={closeIcon} alt="Закрыть" />
					</button>
				</Link>
			</nav>
		</header >
	)
}


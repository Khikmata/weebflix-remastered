import { useState } from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/icons/logo.svg'
import profileIcon from '../../assets/icons/profile.svg'
import searchIcon from '../../assets/icons/search.svg'
import styles from './Navbar.styles.module.scss'

export const Navbar = () => {

	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<header className={styles['navbar']}>
			<nav className={styles['navbar-content']}>
				<Link to={'/'} className={styles['navbar-logo']}>
					<img src={logo} alt={"Главная"} />
				</Link>
				<Link to={'/'} className={styles['navbar-auth']}>
					<img className={styles['profile']} width={32} src={profileIcon} alt="Профиль"></img>
					<input className={[styles['search-bar'], styles[searchOpen ? 'active' : '']].join(' ')} placeholder='Поиск...'></input>
					<button type="button" onClick={() => setSearchOpen(!searchOpen)}>
						<img className={styles['search']} width={32} src={searchIcon} alt="Поиск"></img>
					</button>
				</Link>
			</nav>
		</header >
	)
}


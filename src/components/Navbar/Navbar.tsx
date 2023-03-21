import { Link } from "react-router-dom"
import logo from '../../assets/icons/logo.svg'
import styles from './Navbar.styles.module.scss'

const Navbar = () => {


	return (
		<header className={styles['Navbar']}>
			<nav className={styles['Navbar-content']}>
				<Link to={'/'} className={styles['Navbar-logo']}>
					<img src={logo} alt={"home"} />
				</Link>
				<Link to={'/'} className={styles['Navbar-auth']}>
					ВОЙТИ
				</Link>
			</nav>
		</header>
	)
}

export default Navbar
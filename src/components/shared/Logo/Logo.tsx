import { Link } from 'react-router-dom'
import styles from './Logo.styles.module.scss'
import logoIcon from '@assets/icons/LogoIcon.svg'

export const Logo = () => {
  return (
    <Link to={'/'} className={styles['logo']}>
      <img src={logoIcon} alt={'Главная'} />
    </Link>
  )
}

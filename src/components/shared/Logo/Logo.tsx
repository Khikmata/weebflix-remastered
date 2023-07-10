import { Link } from 'react-router-dom'
import styles from './Logo.styles.module.scss'
import { ReactComponent as LogoIcon } from '@assets/icons/LogoIcon.svg'

export const Logo = () => {
  return (
    <Link to={'/'} className={styles['logo']}>
      <LogoIcon />
    </Link>
  )
}

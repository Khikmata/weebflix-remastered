import { memo, useState } from 'react'

import { Burger } from '@components/features/Burger/Burger'
import { BurgerModal } from '@components/features/BurgerModal/BurgerModal'
import { LanguageHandler } from '@components/features/LanguageHandler/LanguageHandler'
import { ProfileHandler } from '@components/features/ProfileHandler/ProfileHandler'
import { SearchHandler } from '@components/features/SearchHandler/SearchHandler'
import { Logo } from '@components/shared/Logo/Logo'
import styles from './Navbar.styles.module.scss'

export const Navbar = memo(() => {
  const [burgerOpen, setBurgerOpen] = useState(false)

  const handleBurger = () => {
    setBurgerOpen((state) => (state = !state))
  }

  return (
    <header className={styles['navbar']}>
      {burgerOpen && (
        <BurgerModal handleBurger={handleBurger} burgerOpen={burgerOpen} />
      )}
      <nav className={styles['navbar-content']}>
        <Logo />
        <div className={styles['navbar-auth']}>
          <ProfileHandler />
          <LanguageHandler />
          <SearchHandler />
        </div>
        <Burger handleBurger={handleBurger} burgerOpen={burgerOpen} />
      </nav>
    </header>
  )
})

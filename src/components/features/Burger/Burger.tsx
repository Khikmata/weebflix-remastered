import styles from './Burger.styles.module.scss'

interface BurgerProps {
  handleBurger: () => void
  burgerOpen: boolean
}

export const Burger = ({ handleBurger, burgerOpen }: BurgerProps) => {
  return (
    <button
      onClick={handleBurger}
      className={[styles['burger'], styles[burgerOpen ? 'active' : '']].join(
        ' ',
      )}
    >
      <span />
      <span />
      <span />
    </button>
  )
}

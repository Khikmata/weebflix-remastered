import { Variants, motion } from 'framer-motion'
import { Modal } from '..'
import { LanguageHandler } from '../LanguageHandler/LanguageHandler'
import { ProfileHandler } from '../ProfileHandler/ProfileHandler'
import { SearchBar } from '../SearchBar/SearchBar'
import styles from './BurgerModal.styles.module.scss'
interface BurgerModalProps {
  handleBurger: () => void
  burgerOpen: boolean
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24, duration: 0.2 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

export const BurgerModal = ({ handleBurger, burgerOpen }: BurgerModalProps) => {
  return (
    <Modal
      startPos={-800}
      endPos={-500}
      handleClose={handleBurger}
      noContainer={false}
    >
      <div
        className={[
          styles['burger-curtain'],
          styles[burgerOpen ? 'active' : ''],
        ].join(' ')}
      >
        <motion.ul
          animate={burgerOpen ? 'open' : 'closed'}
          style={{ pointerEvents: burgerOpen ? 'auto' : 'none' }}
          variants={{
            open: {
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
          <motion.li
            className={styles['burger-curtain__item']}
            variants={itemVariants}
          >
            <SearchBar searchOpen={true} showTransition={true} />
          </motion.li>
          <motion.li
            className={styles['burger-curtain__item']}
            variants={itemVariants}
          >
            <label>
              {' '}
              <ProfileHandler />
              Профиль
            </label>
          </motion.li>
          <motion.li
            className={styles['burger-curtain__item']}
            variants={itemVariants}
          >
            <label>
              {' '}
              <LanguageHandler />
              Язык
            </label>
          </motion.li>
        </motion.ul>
      </div>
    </Modal>
  )
}

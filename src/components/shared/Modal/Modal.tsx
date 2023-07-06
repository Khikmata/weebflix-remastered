import React from 'react'

import styles from './Modal.styles.module.scss'
import { motion } from 'framer-motion'

interface ModalProps {
  children: React.ReactNode | null
  handleClose: () => void
  noContainer?: boolean
  startPos?: number
  endPos?: number
  scale?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  children,
  handleClose,
  noContainer,
  startPos,
  endPos,
  scale,
}) => {
  return (
    <div className={styles['modal']} onClick={handleClose}>
      <motion.div
        initial={{ scale: scale ? 0.1 : 1, opacity: 0.5, y: startPos }}
        animate={{ scale: 1, opacity: 1, y: endPos }}
        exit={{ opacity: 0 }}
        className={styles[noContainer ? '' : 'modal-container']}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles['modal-container__content']}>{children}</div>
      </motion.div>
    </div>
  )
}

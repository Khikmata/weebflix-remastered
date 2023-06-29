import React from 'react'

import styles from './Modal.styles.module.scss'

interface ModalProps {
  children: React.ReactNode | null
  handleClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, handleClose }) => {
  return (
    <div
      className={styles['modal']}
      onMouseDown={handleClose}
      onTouchEnd={handleClose}
    >
      <div
        className={styles['modal-container']}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchCancel={handleClose}
      >
        <div className={styles['modal-container__content']}>{children}</div>
      </div>
    </div>
  )
}
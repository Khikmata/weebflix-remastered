import React from 'react'

import styles from './Modal.styles.module.scss'
import { useAppDispatch } from 'hooks/redux'
import { authModalAction } from '@store/reducers/Auth/AuthModal'

interface ModalProps {
  children: React.ReactNode | null
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(authModalAction.setModalOpen(false))
  }

  return (
    <div className={styles['modal']} onMouseDown={handleClose} onTouchEnd={handleClose}>
      <div className={styles['modal-container']} onMouseDown={(e) => e.stopPropagation()} onTouchCancel={handleClose}>
        <div className={styles['modal-container__content']}>{children}</div>
      </div>
    </div>
  )
}

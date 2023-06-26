import React, { useState } from 'react'

import { Modal } from '@components/features'
import { authModalAction } from '@store/reducers/Auth/AuthModal'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import styles from './AuthModal.styles.module.scss'

export const AuthModal = () => {
  const dispatch = useAppDispatch()

  const isOpen = useAppSelector((state) => state.auth.isOpen)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setUsername('')
    setPassword('')
  }

  const handleClose = () => {
    dispatch(authModalAction.setModalOpen(false))
    setUsername('')
    setPassword('')
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal handleClose={handleClose}>
      <div className={styles['auth-top']}>
        <b>Авторизация (недоступно)</b>
        <button className={styles['auth-top__close']} onClick={handleClose}>
          {' '}
          x
        </button>
      </div>
      <div className={styles['auth-middle']}>
        <ul>
          <li className={styles['active']}>
            <button className={styles['auth-state']}> Логин </button>
          </li>
          <li>
            <button className={styles['auth-state']}> Регистрация </button>
          </li>
        </ul>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles['auth-form']}>
        <label className={styles['form-input']}>
          Никнейм
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={styles['form-input']}>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className={styles['form-button']}>Войти</button>
      </form>
    </Modal>
  )
}

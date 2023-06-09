import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'
import { Modal } from '@components/features'
import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { memo, useCallback, useEffect, useState } from 'react'
import styles from './AuthModal.styles.module.scss'
import { Login } from './Login/Login'
import { Register } from './Register/Register'

type AuthState = 'login' | 'register'

export const AuthModal = memo(() => {
  const dispatch = useAppDispatch()

  const [authState, setAuthState] = useState<AuthState>('login')
  const isOpen = useAppSelector((state) => state.auth.isOpen)

  const handleClose = useCallback(() => {
    dispatch(authModalAction.setModalOpen(false))
  }, [dispatch])

  const handleAuthState = (state: AuthState) => {
    setAuthState(state)
  }

  useEffect(() => {
    return () => {
      handleClose()
    }
  }, [handleClose])

  if (!isOpen) {
    return null
  }

  return (
    <Modal startPos={-100} endPos={0} handleClose={handleClose}>
      <div className={styles['auth-modal']}>
        <div className={styles['auth-top']}>
          <b>Авторизация</b>
          <button className={styles['auth-top__close']} onClick={handleClose}>
            <CloseIcon className={'auth-close'} />
          </button>
        </div>
        <div className={styles['auth-middle']}>
          <ul>
            <li
              className={[
                styles['auth-state'],
                styles[authState === 'login' ? 'active' : ''],
              ].join(' ')}
            >
              <button
                onClick={() => handleAuthState('login')}
                className={[
                  styles['auth-state'],
                  styles[authState === 'login' ? 'active' : ''],
                ].join(' ')}
              >
                {' '}
                Логин{' '}
              </button>
            </li>
            <li
              className={[
                styles['auth-state'],
                styles[authState === 'register' ? 'active' : ''],
              ].join(' ')}
            >
              <button onClick={() => handleAuthState('register')}>
                {' '}
                Регистрация{' '}
              </button>
            </li>
          </ul>
        </div>
        {authState === 'register' ? (
          <Register />
        ) : (
          <Login handleClose={handleClose} />
        )}
      </div>
    </Modal>
  )
})

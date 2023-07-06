import profileIcon from '@assets/icons/ProfileIcon.svg'
import { Dropdown } from '@components/shared/Dropdown/Dropdown'
import { authModalAction } from '@store/reducers/Auth/AuthModalSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProfileHandler.styles.module.scss'
export const ProfileHandler = () => {
  const [profileDropdown, setProfileDropdown] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.auth.user)
  const openProfile = () => {
    setProfileDropdown((state) => (state = !state))
  }
  const handleProfile = (value: string) => {
    if (!user) {
      dispatch(authModalAction.setModalOpen(true))
      return
    }
    if (value === 'logout') {
      console.log('отработало')
      window.localStorage.removeItem('token')
      dispatch(authModalAction.logout)
    }
    if (value === 'profile') {
      navigate('/profile')
    }
  }

  useEffect(() => {}, [user])
  return (
    <button onClick={openProfile} className={styles['profile']}>
      <img width={32} src={profileIcon} alt="Профиль"></img>
      {user ? (
        <Dropdown
          open={profileDropdown}
          options={[
            { value: 'profile', label: 'profile' },
            { value: 'logout', label: 'logout' },
          ]}
          onSelect={handleProfile}
        />
      ) : (
        <Dropdown
          open={profileDropdown}
          options={[{ value: 'Log in', label: 'login' }]}
          onSelect={handleProfile}
        />
      )}
    </button>
  )
}

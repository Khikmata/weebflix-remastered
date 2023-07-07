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

  const handleProfile = async (value: string) => {
    if (!user) {
      dispatch(authModalAction.setModalOpen(true))
      return
    }
    if (value === 'logout') {
      dispatch(authModalAction.logout)
    }
    if (value === 'profile') {
      navigate('/profile')
    }
    setProfileDropdown(false)
  }

  const authorizedOptions = [
    { value: 'profile', label: 'profile' },
    { value: 'logout', label: 'logout' },
  ]
  const deauthorizedOptions = [{ value: 'Log in', label: 'login' }]

  useEffect(() => {}, [user])
  return (
    <button onClick={openProfile} className={styles['profile']}>
      <img width={32} src={profileIcon} alt="Профиль"></img>
      {user ? (
        <Dropdown
          open={profileDropdown}
          options={authorizedOptions}
          onSelect={handleProfile}
        />
      ) : (
        <Dropdown
          open={profileDropdown}
          options={deauthorizedOptions}
          onSelect={handleProfile}
        />
      )}
    </button>
  )
}

import { ReactComponent as ProfileIcon } from '@assets/icons/ProfileIcon.svg'
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

  const toggleProfile = () => {
    setProfileDropdown((state) => (state = !state))
  }

  const handleProfile = async (value: string) => {
    toggleProfile()
    if (value === 'login') {
      dispatch(authModalAction.setModalOpen(true))
    }
    if (value === 'logout') {
      dispatch(authModalAction.logout)
      window.localStorage.removeItem('token')
      window.location.reload()
    }
    if (value === 'profile') {
      navigate('/profile')
    }
    toggleProfile()
  }

  const authorizedOptions = [
    { value: 'profile', label: 'profile' },
    { value: 'logout', label: 'logout' },
  ]
  const deauthorizedOptions = [{ value: 'login', label: 'login' }]

  useEffect(() => {}, [user])
  return (
    <button onClick={toggleProfile} className={styles['profile']}>
      <ProfileIcon />
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

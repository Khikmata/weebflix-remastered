import { PageWrapper } from '@components/shared'
import { useAppSelector } from 'hooks/redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './profile.styles.module.scss'

const ProfilePage = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true })
    }
  }, [])
  return (
    <PageWrapper filled>
      <div className={styles['']}>тут пока пусто =)</div>
    </PageWrapper>
  )
}

export default ProfilePage

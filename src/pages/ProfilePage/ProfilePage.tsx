import { PageWrapper } from '@components/shared'
import axios from 'axios'
import { useAppSelector } from 'hooks/redux'
import { useEffect } from 'react'
import styles from './profile.styles.module.scss'

const ProfilePage = () => {
  return (
    <PageWrapper filled>
      <div className={styles['']}></div>
    </PageWrapper>
  )
}

export default ProfilePage

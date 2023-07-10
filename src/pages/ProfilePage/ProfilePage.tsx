import { AnimeCard, PageWrapper } from '@components/shared'
import dayjs from 'dayjs'
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
      <div className={styles['grid']}>
        <div className={styles['image-container']}>
          <img
            className={styles['image-container__image']}
            src={user?.profileImage}
          />
        </div>
        <div className={styles['user-info']}>
          <div>
            <p className={styles['user-info__name']}>{user?.username}</p>
            <div className={styles['user-info__impact']}>
              <p>{'Comments created: ' + user?.comments.length}</p>
              <p>
                {'Date of registration: ' +
                  dayjs(user?.createdAt).format('DD/MM/YYYY')}
              </p>
            </div>
          </div>
          <div className={styles['user-info__watchstates']}>
            <div className={styles['watchstates-track']}>
              <div className={styles['watchstates-track__completed']}></div>
              <div className={styles['watchstates-track__planned']} />
              <div className={styles['watchstates-track__dropped']} />
            </div>
            <div className={styles['watchstates-display']}>
              <p className={styles['watchstates-display__completed']}>
                Watched: {user?.watchList.length}
              </p>
              <p className={styles['watchstates-display__completed']}>
                Planned: {user?.watchList.length}
              </p>
              <p className={styles['watchstates-display__completed']}>
                Dropped: {user?.watchList.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className={styles['favorite__title']}>Favorite</p>
      <div className={styles['favorite']}>
        {user?.favoriteList.map((favItem) => (
          <div className={styles['favorite__card']}>
            <AnimeCard item={favItem} />
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}

export default ProfilePage

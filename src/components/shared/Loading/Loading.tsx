import styles from './Loading.styles.module.scss'

interface LoadingProps {
  width?: number
}

export const Loading = ({ width }: LoadingProps) => {
  return (
    <div>
      <div className={styles['spinner-container']}>
        <div
          className={styles['loading-spinner']}
          style={{ width: width }}
        ></div>
      </div>
    </div>
  )
}

import { Loading } from '@components/shared'
import styles from './LoadingBlock.styles.module.scss'
export const LoadingBlock = () => {
  return <div className={styles['loadingBlock']}>{<Loading />}</div>
}

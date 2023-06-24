import errorImg from '@assets/images/error.png'
import { Button } from '@components/shared'
import styles from './ErrorBlock.styles.module.scss'

export const ErrorBlock = () => {
  const handleNavigateToPrevPage = () => {}

  return (
    <div className={styles['errorBlock']}>
      <div className={styles['errorBlock-title']}>
        <h2>Упс, произошла непридвиденная ошибка</h2>
        <img
          className={styles['errorBlock-title__image']}
          src={errorImg}
          width={84}
          height={84}
          alt="изображение ошибки"
        />
      </div>
      <Button
        onClick={handleNavigateToPrevPage}
        color="primary"
        contentPadding="8px"
        marginVertical={12}
      >
        <p>Вернуться обратно</p>
      </Button>
    </div>
  )
}

import errorImg from '@assets/images/error.png'
import { Button } from '@components/shared'
import styles from './ErrorPopup.styles.module.scss'

export const ErrorPopup = () => {
  const handleNavigateToPrevPage = () => {}

  return (
    <div className={styles['errorPopup']}>
      <div className={styles['errorPopup-title']}>
        <h2>Упс, произошла непридвиденная ошибка</h2>
        <img
          className={styles['errorPopup-title__image']}
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

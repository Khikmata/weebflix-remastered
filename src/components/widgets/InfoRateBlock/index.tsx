import dropDownIcon from '@assets/icons/DropdownIcon.svg'
import starIcon from '@assets/icons/StarIcon.svg'
import styles from './InfoRateBlock.styles.module.scss'

export const InfoRateBlock = () => {
  return (
    <>
      <button className={styles['anime-info__rate']}>
        <img src={starIcon} alt="оценить" />
        <p>Оцените сериал</p>
      </button>
      <button className={styles['anime-info__addlist']}>
        <p>
          <span>+</span> Добавить в список
        </p>
        <img src={dropDownIcon} alt="" />
      </button>
    </>
  )
}

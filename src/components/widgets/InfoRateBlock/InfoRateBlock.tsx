import dropDownIcon from '@assets/icons/DropdownIcon.svg'
import starIcon from '@assets/icons/StarIcon.svg'
import { useTranslation } from 'react-i18next'
import styles from './InfoRateBlock.styles.module.scss'

export const InfoRateBlock = () => {
  const { t } = useTranslation()
  return (
    <>
      <button className={styles['anime-info__rate']}>
        <p>{t('animepage_rate_button')}</p>
        <img src={starIcon} alt="оценить" />
      </button>
      <button className={styles['anime-info__addlist']}>
        <p>{t('animepage_add_button')}</p>
        <img src={dropDownIcon} alt="" />
      </button>
    </>
  )
}

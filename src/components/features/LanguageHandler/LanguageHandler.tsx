import languageIcon from '@assets/icons/LanguageIcon.svg'
import i18n from 'i18n/i18n'
import { useEffect, useState } from 'react'
import styles from './LanguageHandler.styles.module.scss'

export const LanguageHandler = () => {
  const handleLanguageChange = () => {
    currentLanguage === 'en'
      ? setCurrentLanguage('ru')
      : setCurrentLanguage('en')
  }
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')

  useEffect(() => {
    i18n.changeLanguage(currentLanguage)
  }, [currentLanguage])

  return (
    <button className={styles['language']} onClick={handleLanguageChange}>
      <img width={32} src={languageIcon} alt="смена языка" />
    </button>
  )
}

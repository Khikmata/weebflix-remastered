import React from 'react'

import { CatalogueActions } from '@store/reducers/Catalogue/CatalogueSlice'
import { CatalogueSliderActions } from '@store/reducers/Catalogue/CatalogueSliderSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useTranslation } from 'react-i18next'
import styles from './OptionsBlock.styles.module.scss'

interface OptionsBlockProps {
  options: string[]
}

export const OptionsBlock: React.FC<OptionsBlockProps> = ({ options }) => {
  const dispatch = useAppDispatch()
  const activeCatalogueSliderOption = useAppSelector((state) => state.catalogueSlider.activeSliderIndex)
  const activeCatalogueOption = useAppSelector((state) => state.catalogue.activeCatalogueIndex)

  const { t } = useTranslation()

  function handleActiveOption() {
    if (options[0] === t('option_relevance')) {
      return activeCatalogueSliderOption
    }
    if (options[0] === t('option_anime')) {
      return activeCatalogueOption
    }
    return ''
  }

  const handleChangeOption = (index: number) => {
    if (options.includes(t('option_relevance'))) {
      dispatch(CatalogueSliderActions.setActiveCatalogueSliderIndex(index))
    }
    if (options.includes(t('option_anime'))) {
      dispatch(CatalogueActions.setActiveCatalogueIndex(index))
    }
    return ''
  }

  return (
    <div className={styles['options']}>
      <div className={styles['options__content']}>
        <ul>
          {options.map((option, index: number) => (
            <li
              key={index}
              onClick={() => handleChangeOption(index)}
              className={styles[`${handleActiveOption() === index && 'active'}`]}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

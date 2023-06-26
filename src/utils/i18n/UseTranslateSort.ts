import { useTranslation } from 'react-i18next'

export const UseTranslateSort = (sort: string) => {
  const { t } = useTranslation()

  switch (sort) {
    case 'asc':
      return t('sort_asc')
    case 'desc':
      return t('sort_desc')
    default:
      return sort
  }
}

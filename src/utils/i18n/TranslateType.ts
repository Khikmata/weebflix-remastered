import { useTranslation } from 'react-i18next'

export const TranslateType = (type: string | null) => {
  const { t } = useTranslation()

  switch (type?.toLowerCase()) {
    case 'tv':
      return t('type_tv')
    case 'movie':
      return t('type_movie')
    case 'ona':
      return t('type_ona')
    case 'ova':
      return t('type_ova')
    case 'special':
      return t('type_special')
    case 'music':
      return t('type_music')
    default:
      return t('filter_types_placeholder')
  }
}

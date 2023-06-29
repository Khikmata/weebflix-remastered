import { useTranslation } from 'react-i18next'

export const TranslateStatus = (status: string | null): string => {
  const { t } = useTranslation()
  switch (status?.toLowerCase()) {
    case 'not yet aired':
      return t('anime_status_notyetaired')
    case 'currently airing':
      return t('anime_status_currentlyairing')
    case 'finished airing':
      return t('anime_status_finishedairing')
    case 'upcoming':
      return t('anime_status_upcoming')
    case 'airing':
      return t('anime_status_airing')
    case 'complete':
      return t('anime_status_complete')
    default:
      return t('filter_status_placeholder')
  }
}

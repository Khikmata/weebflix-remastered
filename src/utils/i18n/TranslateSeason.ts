import { useTranslation } from 'react-i18next'

export const TranslateSeason = (season: string | null): string => {
  const { t } = useTranslation()
  switch (season) {
    case 'winter':
      return t('season_winter')
    case 'summer':
      return t('season_summer')
    case 'fall':
      return t('season_fall')
    case 'spring':
      return t('season_spring')
    default:
      return t('filter_seasons_placeholder')
  }
}

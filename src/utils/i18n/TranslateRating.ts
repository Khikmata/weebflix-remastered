import { useTranslation } from 'react-i18next'

export const TranslateRating = (rating: string | null): string => {
  const { t } = useTranslation()

  switch (rating) {
    case 'G - All Ages':
      return t('rating_g')
    case 'PG - Children':
      return t('rating_pg')
    case 'PG-13 - Teens 13 or older':
      return t('rating_pg13')
    case 'R - 17+ (violence & profanity)':
      return t('rating_r17')
    case 'R+ - Mild Nudity':
      return t('rating_r+')
    case 'Rx - Hentai':
      return t('rating_rx')
    default:
      return t('filter_rating_placeholder')
  }
}

import { useTranslation } from 'react-i18next'

export const UseTranslateOrder = (order: string) => {
  const { t } = useTranslation()

  switch (order) {
    case 'mal_id':
      return t('order_mal_id')
    case 'title':
      return t('order_title')
    case 'type':
      return t('order_type')
    case 'rating':
      return t('order_rating')
    case 'start_date':
      return t('order_startdate')
    case 'end_date':
      return t('order_enddate')
    case 'episodes':
      return t('order_episode')
    case 'score':
      return t('order_score')
    case 'scored_by':
      return t('order_scoredby')
    case 'rank':
      return t('order_rank')
    case 'popularity':
      return t('order_popularity')
    case 'members':
      return t('order_members')
    case 'favorites':
      return t('order_favorites')
    default:
      return order
  }
}

export function TranslateOrderToRussian(order: string) {
  switch (order) {
    case 'mal_id':
      return 'По ID'
    case 'title':
      return 'По названию'
    case 'type':
      return 'По типу'
    case 'rating':
      return 'По возрастному ограничению'
    case 'start_date':
      return 'По началу выхода'
    case 'end_date':
      return 'По концу выхода'
    case 'episodes':
      return 'По количеству эпизодов'
    case 'score':
      return 'По рейтингу'
    case 'scored_by':
      return 'По количеству оценок'
    case 'rank':
      return 'По месту'
    case 'popularity':
      return 'По популярности'
    case 'members':
      return 'По количеству участников'
    case 'favorites':
      return 'По полюбившимся'
    default:
      return order
  }
}

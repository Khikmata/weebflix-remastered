export function TranslateTypeToRussian(type: string) {
  switch (type.toLowerCase()) {
    case 'tv':
      return 'ТВ-Сериал'
    case 'movie':
      return 'Фильм'
    case 'ona':
      return 'ОНА'
    case 'ova':
      return 'ОВА'
    case 'special':
      return 'Спешл'
    case 'music':
      return 'Музыкальный'
    default:
      return type
  }
}

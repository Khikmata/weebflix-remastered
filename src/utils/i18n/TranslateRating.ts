export function TranslateRatingToRussian(rating: string) {
  switch (rating) {
    case 'G - All Ages':
      return 'g'
    case 'PG - Children':
      return 'pg'
    case 'PG-13 - Teens 13 or older':
      return 'pg13'
    case 'R - 17+ (violence & profanity)':
      return 'r17'
    case 'R+ - Mild Nudity':
      return 'r'
    case 'Rx - Hentai':
      return 'rx'
    default:
      return rating
  }
}

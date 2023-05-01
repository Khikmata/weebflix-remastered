export function TranslateRatingToRussian(rating: string) {
  switch (rating) {
    case 'G - All Ages':
      return 'G'
    case 'PG - Children':
      return 'PG'
    case 'PG-13 - Teens 13 or older':
      return 'PG-13'
    case 'R - 17+ (violence & profanity)':
      return 'R 17'
    case 'R+ - Mild Nudity':
      return 'R+ 18'
    case 'Rx - Hentai':
      return 'RX'
    default:
      return rating
  }
}

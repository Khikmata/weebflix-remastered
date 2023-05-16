export function TranslateSortToRussian(sort: string) {
  switch (sort) {
    case 'asc':
      return 'По возрастающей'
    case 'desc':
      return 'По убывающей'
    default:
      return sort
  }
}

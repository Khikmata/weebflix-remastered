import { IGenres } from 'types/DetailsTypes'

export function SortGenres(genresToSort: IGenres[]) {
  return [...genresToSort]?.sort((a, b) => b.count - a.count)
}

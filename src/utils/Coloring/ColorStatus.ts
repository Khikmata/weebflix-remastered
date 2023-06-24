
export const ColorStatus = (item: string) => {

  if (item === ('anime_status_onair')) {
    return '#79F9F9'
  }
  if (item === ('anime_status_aired') ) {
    return '#ABE96E'
  }
  if (item === ('anime_status_notaired') ) {
    return '#F97979'
  }
  return '#F0F0F0'
}

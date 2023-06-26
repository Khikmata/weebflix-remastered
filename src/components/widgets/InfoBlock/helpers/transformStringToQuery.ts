export const transformStatusToQuery = (status: string) => {
  if (status === 'Finished Airing') {
    return (status = 'complete')
  }
  if (status === 'Currently Airing') {
    return (status = 'airing')
  }
  if (status === 'Not yet aired') {
    return (status = 'upcoming')
  }
}

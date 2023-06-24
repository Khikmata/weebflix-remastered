import { Button, Loading } from '@components/shared'
import { PageWrapper } from '@components/shared/PageWrapper/PageWrapper'
import { CharactersBlock, InfoBlock, PlayerBlock, RankBlock, RelationBlock } from '@components/widgets'
import { InfoRateBlock } from '@components/widgets/InfoRateBlock'
import { PlayerApi } from '@store/services/getPlayer'
import axios from 'axios'
import { useAppSelector } from 'hooks/redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimeApi } from 'store/services'
import styles from './animepage.styles.module.scss'

export const AnimePage = () => {
  const [skip, setSkip] = useState<boolean>(true)
  const [urlQuery, setUrlQuery] = useState<string>('')

  const selectedEpisode = useAppSelector((state) => state.player.activeEpisode)
  const { id } = useParams<string>()

  const {
    data: details,
    error: detailsErrors,
    isLoading: detailsLoading,
  } = AnimeApi.useGetAnimeDetailsQuery(id ? id : '')

  const {
    data: playerData,
    error: playerError,
    isLoading: playerLoading,
  } = PlayerApi.useGetAnimePlayerQuery({ url: urlQuery, episodeNumber: selectedEpisode }, { skip })

  const fetchAnimeDetails = async () => {
    try {
      if (details) {
        const response = await axios.get(`https://weebflix-backend.onrender.com/getParsedUrl/${details.title}`)
        console.log(response.data)
        setUrlQuery(response.data.url)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    fetchAnimeDetails()
  }, [details])

  useEffect(() => {
    if (urlQuery !== '') {
      setSkip(false)
    }
  }, [details, urlQuery])

  return (
    <PageWrapper source={details?.images.webp.large_image_url} filled={true}>
      <div className={styles['anime-page__info']}>
        <div className={styles['anime-info__leftside']}>
          <div className={styles['anime-info__image']}>
            <img loading="lazy" src={details?.images.webp.large_image_url} alt="обложка" />
          </div>
          <InfoRateBlock />
        </div>
        <div className={styles['anime-info__rightside']}>
          <div className={styles['anime-info-title']}>
            <p>{details?.title_english || details?.title}</p>
            <span> {details?.title_japanese}</span>
          </div>
          {details && <RankBlock details={details} />}
          <Button scale height={40} marginVertical={16} color="primary">
            <Link to={`https://www.youtube.com/watch?v=${details?.trailer.youtube_id}`}>Смотреть трейлер</Link>
          </Button>
          {detailsLoading && (
            <span>
              Загрузка описания... <Loading />
            </span>
          )}
          {detailsErrors && <p>Ошибка при загрузке описания...</p>}
          {details && <InfoBlock details={details} />}
        </div>
      </div>
      <CharactersBlock id={id ? id : ''} />
      <RelationBlock id={id ? id : ''} />
      {playerLoading && (
        <span>
          Загрузка плеера... <Loading />
        </span>
      )}
      {playerData && details && <PlayerBlock sources={playerData.sources} details={details} />}
      {playerError && <p>Произошла ошибка при загрузке плеера.</p>}
    </PageWrapper>
  )
}

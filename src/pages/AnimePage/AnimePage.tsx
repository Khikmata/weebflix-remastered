import { ReactComponent as FavoriteIcon } from '@assets/icons/Favorite.svg'
import { Modal } from '@components/features'
import { Button, Loading } from '@components/shared'
import { PageWrapper } from '@components/shared/PageWrapper/PageWrapper'
import {
  CharacterSection,
  InfoBlock,
  PlayerBlock,
  RankBlock,
  RelationBlock,
} from '@components/widgets'
import { InfoRateBlock } from '@components/widgets/InfoRateBlock/InfoRateBlock'
import { AnimeDetailsApi } from '@store/services'
import { PlayerApi } from '@store/services/PlayerApi'
import axios from 'axios'
import { useAppSelector } from 'hooks/redux'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import styles from './animepage.styles.module.scss'

const AnimePage = memo(() => {
  const [skip, setSkip] = useState<boolean>(true)
  const [urlQuery, setUrlQuery] = useState<string>('')

  const selectedEpisode = useAppSelector((state) => state.player.activeEpisode)
  const { id } = useParams<string>()

  const [openTrailerModal, setOpenTrailerModal] = useState(false)

  const handleTrailerModal = () => {
    setOpenTrailerModal((open) => (open = !open))
  }

  const { data: details } = AnimeDetailsApi.useGetAnimeDetailsQuery(
    id ? id : '',
  )

  const {
    data: playerData,
    error: playerError,
    isLoading: playerLoading,
  } = PlayerApi.useGetAnimePlayerQuery(
    { url: urlQuery, episodeNumber: selectedEpisode },
    { skip },
  )

  const { t } = useTranslation()
  const [openDescription, setOpenDescirpiton] = useState(false)
  const fetchAnimeDetails = async () => {
    try {
      if (details) {
        const response = await axios.get(
          `http://localhost:4001/player/parseurl/${details.title}`,
        )
        setUrlQuery(response.data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    fetchAnimeDetails()
  }, [details])

  const user = useAppSelector((state) => state.auth.user)

  const setFavorite = async () => {
    try {
      await axios.post('http://localhost:4001/favorites', {
        anime: details,
        userId: user?._id,
      })
    } catch (error: any) {
      console.log(error?.message)
    }
  }

  // const setWatchstate = async () => {
  //   try {
  //     await axios.post('http://localhost:4001/watchlist', {
  //       user: user,
  //       animeId: details?.mal_id,
  //     })
  //   } catch (error: any) {
  //     console.log(error?.message)
  //   }
  // }

  useEffect(() => {
    if (urlQuery !== '' && details?.score) {
      setSkip(false)
    }
  }, [details, urlQuery])

  return (
    <PageWrapper source={details?.images.webp.large_image_url} filled={true}>
      {openTrailerModal && (
        <Modal handleClose={handleTrailerModal}>
          <ReactPlayer url={details?.trailer.embed_url} />
        </Modal>
      )}
      <div>
        <div className={styles['anime-page__info']}>
          <div className={styles['anime-info__leftside']}>
            <div className={styles['anime-info__image']}>
              <img
                className={styles['anime-info__image-src']}
                loading="lazy"
                src={details?.images.webp.large_image_url}
                alt="обложка"
              />
              <button
                onClick={setFavorite}
                className={styles['anime-info__favorite']}
              >
                <FavoriteIcon />
                {/* <img

                  loading="lazy"
                  src={favoriteIcon}
                  alt="favorite"
                /> */}
              </button>
            </div>
            <div className={styles['anime-info__mobile']}>
              <div className={styles['anime-info-title__mobile']}>
                <p>{details?.title_english || details?.title}</p>
                <span> {details?.title_japanese}</span>
              </div>
              <InfoRateBlock details={details} />
            </div>
          </div>
          <div className={styles['anime-info__rightside']}>
            <div className={styles['anime-info-title']}>
              <p>{details?.title_english || details?.title}</p>
              <span> {details?.title_japanese}</span>
            </div>
            {details && <RankBlock details={details} />}
            <Button
              onClick={handleTrailerModal}
              scale
              height={40}
              marginVertical={16}
              color="primary"
            >
              Смотреть трейлер
            </Button>
            {details && <InfoBlock details={details} />}
          </div>
        </div>
        <div
          onClick={() => setOpenDescirpiton((prevstate) => !prevstate)}
          className={[
            styles['description'],
            styles[openDescription ? 'active' : ''],
          ].join(' ')}
        >
          {' '}
          <strong>
            {t('animepage_info_description')}
            <br />
            <p>{details?.synopsis}</p>
          </strong>
        </div>
      </div>

      <CharacterSection id={id ? id : ''} />
      <RelationBlock id={id ? id : ''} />
      {playerLoading && (
        <>
          'Загрузка плеера...' <Loading />
        </>
      )}
      {playerData && details && (
        <PlayerBlock sources={playerData.sources} details={details} />
      )}
      {playerError && <p>Произошла ошибка при загрузке плеера.</p>}
    </PageWrapper>
  )
})

export default AnimePage

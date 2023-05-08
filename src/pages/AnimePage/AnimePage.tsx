import { Link, useParams } from 'react-router-dom'
import dropdown from '../../assets/icons/dropdown.svg'
import star from '../../assets/icons/star.svg'
import { InfoBlock } from '../../components/Blocks/Info'

import { useEffect, useState } from 'react'
import { CharactersBlock } from '../../components/Blocks/CharactersBlock'
import { PlayerBlock } from '../../components/Blocks/PlayerBlock'
import { RankBlock } from '../../components/Blocks/Rank'
import { RelationBlock } from '../../components/Blocks/RelationBlock'
import { Button } from '../../components/UI/Button'
import { LoadingComponent } from '../../components/UI/Loading'
import { useAppSelector } from '../../hooks/redux'
import { AnimeApi } from '../../store/services/getAnime'
import { PlayerApi } from '../../store/services/getPlayer'
import styles from './animepage.styles.module.scss'

const AnimePage = () => {
  const [skip, setSkip] = useState<boolean>(true)
  const [urlQuery, setUrlQuery] = useState<string>('')

  const selectedEpisode = useAppSelector((state) => state.playerSlice.activeEpisode)
  let { id } = useParams<string>()
  const [checkForMistakes, setCheckForMistakes] = useState(true);

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

  const removeHyphens = (str: string) => str.replace(/[-☆]/g, '')


  if (playerError && checkForMistakes) {
    setCheckForMistakes(false);
    setUrlQuery(removeHyphens(urlQuery))
  }

  const getUrl = () => {
    let tempSlashes = 0
    let tempUnderscores = 0
    let tempUrl = ''
    if (details?.url) {
      //преобразование юрла и замена _ на - для плеера
      for (let i = 0; i < details?.url.length; i++) {
        if (details.url[i] === '/') {
          tempSlashes++
        }
        if (tempSlashes > 4 && i !== details.url.length - 1) {
          if (details.url[i + 1] === '_') {
            tempUnderscores++
            if (tempUnderscores === 2) {
              continue
            }
          } else {
            tempUnderscores = 0
          }
          tempUrl += details.url[i + 1]
        }
      }
    }
    tempUrl = tempUrl.replace(/_/g, '-')
    setUrlQuery(tempUrl)
  }

  useEffect(() => {
    if (details) {
      getUrl()
      if (urlQuery !== '') {
        setSkip(false)
      }
    }
  }, [details, urlQuery])

  return (
    <div className={styles['anime-page']}>
      <div className={styles['anime-page__background__overlay']} />
      <img
        src={`${details?.images.webp.large_image_url}`}
        alt=""
        className={styles['anime-page__background']}
      />
      <div className={styles['anime-page__container']}>
        <div className={styles['anime-page__info']}>
          <div className={styles['anime-info__leftside']}>
            <div className={styles['anime-info__image']}>
              <img loading="lazy" src={details?.images.webp.large_image_url} alt="обложка" />
            </div>
            <button className={styles['anime-info__rate']}>
              <img src={star} alt="оценить" />
              <p>Оцените сериал</p>
            </button>
            <button className={styles['anime-info__addlist']}>
              <p>
                <span>+</span> Добавить в список
              </p>
              <img src={dropdown} alt="" />
            </button>
          </div>
          <div className={styles['anime-info__rightside']}>
            <div className={styles['anime-info-title']}>
              <p>{details?.title_english || details?.title}</p>
              <span> {details?.title_japanese}</span>
            </div>
            {details && <RankBlock details={details} />}
            <Button
              scale
              height={40}
              marginVertical={16}
              color="primary"
            >
              <Link
                to={`https://www.youtube.com/watch?v=${details?.trailer.youtube_id}`}
              >
                Смотреть трейлер
              </Link>
            </Button>
            {detailsLoading && <span>Загрузка описания... <LoadingComponent /></span>}
            {detailsErrors && <p>Ошибка при загрузке описания...</p>}
            {details && <InfoBlock details={details} />}
          </div>
        </div>
        <CharactersBlock id={id ? id : ''} />
        <RelationBlock />
        {playerLoading && <span>Загрузка плеера... <LoadingComponent /></span>}
        {playerData && details && <PlayerBlock sources={playerData.sources} details={details} />}
        {playerError && <p>Произошла ошибка при загрузке плеера.</p>}
      </div>
    </div>
  )
}

export default AnimePage

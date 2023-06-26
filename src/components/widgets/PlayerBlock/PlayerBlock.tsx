import ReactPlayer from 'react-player'

import { PlayerActions } from '@store/reducers/Player/PlayerSlice'
import { IDetails, ISources } from '@store/types/FetchTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import styles from './PlayerBlock.styles.module.scss'
interface playerBlockProps {
  sources: ISources[]
  details: IDetails
}

export const PlayerBlock = (props: playerBlockProps) => {
  const selectedEpisode = useAppSelector((state) => state.player.activeEpisode)
  const dispatch = useAppDispatch()

  const handleChangeEpisode = (index: number) => {
    dispatch(PlayerActions.setActiveEpisodeIndex(index))
  }

  return (
    <div className={styles['playerBlock']}>
      <h2>Онлайн-плеер</h2>
      <div className={styles['playerBlock-player']}>
        <ReactPlayer
          width="clamp(200px, 100%, 1100px)"
          height="100%"
          style={{ aspectRatio: '16/9' }}
          controls
          url={props.sources[3].url}
        />
        <div className={styles['playerBlock-episode__dropdown']}>
          <ul>
            {Array.from({ length: props.details.episodes }).map(
              (_, index: number) => (
                <li
                  key={index + 1}
                  onClick={() => handleChangeEpisode(index + 1)}
                  className={
                    styles[index + 1 === selectedEpisode ? 'active' : '']
                  }
                >
                  <button>{index + 1} Серия</button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

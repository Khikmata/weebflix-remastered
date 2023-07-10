import { useEffect, useState } from 'react'

import { AnimeDetailsApi } from '@store/services/AnimeDetailsApi'
import { IGetCharacters } from '@store/types/FetchTypes'
import styles from './CharacterSection.styles.module.scss'

interface characterSectionProps {
  id: string
}

export const CharacterSection: React.FC<characterSectionProps> = (id) => {
  const [skip, setSkip] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSkip(false)
    }, 500)
  }, [])

  const { data: characterData } = AnimeDetailsApi.useGetAnimeCharactersQuery(
    id.id,
    {
      skip,
    },
  )
  return (
    <div className={styles['characterSection']}>
      {characterData
        ?.filter((_, index: number) => index < 8)
        .map((character: IGetCharacters) => (
          <div
            className={styles['characterCard']}
            key={character.character.mal_id}
          >
            <img
              src={character.character.images.webp.image_url}
              alt={'обложка'}
              loading="lazy"
            />
            <div className={styles['characterInfo']}>
              <p>{character.character.name}</p>
              <small>{character.role}</small>
            </div>
          </div>
        ))}
    </div>
  )
}

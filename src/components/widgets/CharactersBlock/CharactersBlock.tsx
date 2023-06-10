import { useEffect, useState } from 'react';

import { AnimeApi } from '../../../store/services';
import { IGetCharacters } from '../../../types/FetchTypes';
import styles from './CharactersBlock.styles.module.scss';

interface charactersBlockProps {
  id: string;
}

export const CharactersBlock: React.FC<charactersBlockProps> = (id) => {
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSkip(false);
    }, 500);
  }, []);

  const { data: charactersData } = AnimeApi.useGetAnimeCharactersQuery(id.id, {
    skip,
  });

  return (
    <div className={styles['charactersBlock']}>
      {charactersData
        ?.filter((_, index) => index < 8)
        .map((item: IGetCharacters, index) => (
          <div className={styles['characterCard']} key={index}>
            <img
              src={item.character.images.webp.image_url}
              alt={'обложка'}
              loading="lazy"
            />
            <div className={styles['characterInfo']}>
              <p>{item.character.name}</p>
              <small>{item.role}</small>
            </div>
          </div>
        ))}
    </div>
  );
};

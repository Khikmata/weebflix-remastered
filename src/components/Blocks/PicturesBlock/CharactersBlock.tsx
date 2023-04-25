import { useEffect, useState } from 'react'
import { AnimeApi } from '../../../store/services/getAnime'
import styles from './CharactersBlock.styles.module.scss'

interface charactersBlockProps {
	id: string
}


export const CharactersBlock: React.FC<charactersBlockProps> = (id) => {


	const [skip, setSkip] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setSkip(false)
		}, 300);
	}, [])

	const { data: charactersData } = AnimeApi.useGetAnimeCharactersQuery(id.id, { skip })


	return (
		<div className={styles['charactersBlock']}>
			{

				charactersData?.filter((item, index) => index < 8).map((item: any, index) => (
					<div className={styles['characterCard']} key={index}>
						<img src={item.character.images.webp.image_url} />
						<div className={styles['characterInfo']}>
							<p>{item.character.name}</p>
							<small>{item.role}</small>
						</div>
					</div>
				))
			}
		</div>
	)
}

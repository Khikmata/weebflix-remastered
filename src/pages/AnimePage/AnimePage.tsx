import { Link, useParams } from 'react-router-dom';
import dropdown from '../../assets/icons/dropdown.svg';
import star from '../../assets/icons/star.svg';
import { InfoBlock } from '../../components/Blocks/Info';

import { useEffect, useState } from 'react';
import { CharactersBlock } from '../../components/Blocks/CharactersBlock';
import { PlayerBlock } from '../../components/Blocks/PlayerBlock';
import { RankBlock } from '../../components/Blocks/Rank';
import { Button } from '../../components/Button';
import { AnimeApi } from '../../store/services/getAnime';
import { PlayerApi } from '../../store/services/getPlayer';
import styles from './animepage.styles.module.scss';
import { RelationBlock } from '../../components/Blocks/RelationBlock';

const AnimePage = () => {

	const [skip, setSkip] = useState(true);
	const [urlQuery, setUrlQuery] = useState('');

	let { id } = useParams<string>();

	const { data: details, error: detailsErrors, isLoading: detailsLoading } = AnimeApi.useGetAnimeDetailsQuery(id ? id : '',);
	const { data: playerData, error: playerError, isLoading: playerLoading } = PlayerApi.useGetAnimePlayerQuery(urlQuery, { skip })

	let url = '';
	const getUrl = () => {
		let tempSlashes = 0;
		let tempUnderscores = 0;
		if (details?.url) {
			//преобразование юрла и замена _ на - для плеера
			for (let i = 0; i < details?.url.length; i++) {
				if (details.url[i] === '/') {
					tempSlashes++
				}
				if (tempSlashes > 4 && i !== details.url.length - 1) {
					if (details.url[i + 1] === '_') {
						tempUnderscores++;
						if (tempUnderscores === 2) {
							continue;
						}
					}
					else {
						tempUnderscores = 0;
					}
					url += details.url[i + 1];
				}
			}
		}
		url = url.replace(/_/g, '-')
		setUrlQuery(url);
	}

	useEffect(() => {
		details && getUrl();
		if (url !== '') {

			setSkip(false)
		}
	}, [details, url])

	return (
		<div className={styles['anime-page']}>
			<div className={styles['anime-page__background__overlay']} />
			<img src={`${details?.images.webp.large_image_url}`} alt='' className={styles['anime-page__background']} />
			<div className={styles['anime-page__container']}>
				<div className={styles['anime-page__info']}>
					<div className={styles['anime-info__leftside']}>
						<div className={styles['anime-info__image']}>
							<img loading='lazy' src={details?.images.webp.large_image_url} alt='' />
						</div>
						<button className={styles['anime-info__rate']}>
							<img src={star} alt='оценить' />
							<p>Оцените сериал</p>
						</button>
						<button className={styles['anime-info__addlist']}>
							<p><span>+</span> Добавить в список</p>
							<img src={dropdown} alt='' />
						</button>
					</div>
					<div className={styles['anime-info__rightside']}>
						<div className={styles['anime-info-title']}>
							<p>{details?.title_english || details?.title}</p>
							<span> {details?.title_japanese}</span>
						</div>
						{details && <RankBlock details={details} />}
						<Button scale height={40} marginVertical={16} color='primary'>
							<Link to={`https://www.youtube.com/watch?v=${details?.trailer.youtube_id}`}>Смотреть трейлер</Link>
						</Button>
						{detailsLoading && <p>Загрузка описания...</p>}
						{detailsErrors && <p>Ошибка при загрузке описания...</p>}
						{details && <InfoBlock details={details} />}

					</div>
				</div>
				<CharactersBlock id={id ? id : ''} />
				<RelationBlock />
				{playerLoading && <p>Загрузка плеера...</p>}
				{playerData && <PlayerBlock sources={playerData.sources} />}
				{playerError && <p>Произошла ошибка при загрузке плеера.</p>}
			</div>
		</div>
	)
}

export default AnimePage
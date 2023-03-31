import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import dropdown from '../../assets/icons/dropdown.svg';
import star from '../../assets/icons/star.svg';
import { RankBlock } from '../../components/Blocks/Rank';
import { Button } from '../../components/Button';
import { AnimeApi } from '../../store/services/getAnime';
import { IMoreDetails } from '../../types/GetAnimeTypes';
import styles from './animepage.styles.module.scss';

const AnimePage = () => {

	let { id } = useParams<string>();

	const { data: details, error: detailsErrors, isLoading: detailsLoading } = AnimeApi.useGetAnimeDetailsQuery(id ? id : '')
	const { data: pictures, error: picturesErrors, isLoading: PicturesLoading } = AnimeApi.useGetAnimeImagesQuery(id ? id : '')

	console.log(id)
	console.log(details);
	console.log(pictures);

	return (
		<div className={styles['anime-page']}>
			<div className={styles['anime-page__background']} />
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
						<RankBlock details={details} />
						<Button marginVertical={16}><Link to={`https://www.youtube.com/watch?v=${details?.trailer.youtube_id}`}>Посмотреть трейлер</Link></Button>
						<div className='block'>
							<p>Тип: {details?.type}</p>
							<p>Эпизоды: {details?.episodes}</p>
							<p>Статус: {details?.status}</p>
							<p>Жанры: {details?.genres.map((genre: IMoreDetails) => <Fragment>{genre.name}</Fragment>)}</p>
							<p>Студия: {details?.studios.map((studio: IMoreDetails) => <Fragment>{studio.name}</Fragment>)}</p>
							<p>Рейтинг: {details?.rating}</p>
							<p>Длительность: {details?.duration}</p>
							<p>Выпуск: {details?.year} {details?.season}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimePage
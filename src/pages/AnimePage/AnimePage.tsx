
import { useParams } from 'react-router-dom';
import { AnimeApi } from '../../store/services/getAnime';
import styles from './animepage.styles.module.scss';


const AnimePage = () => {

	let { id } = useParams<string>();

	const { data: details, error: detailsErrors, isLoading: detailsLoading } = AnimeApi.useGetAnimeDetailsQuery(id ? id : '')

	console.log(id)
	console.log(details);

	return (
		<div className={styles['anime-page']}>
			<div className={styles['anime-page__container']}>
				<div className={styles['anime-block__info']}>
					<div className={styles['anime-info__leftside']}>
						<div className="anime-info__image">
							<img loading='lazy' src={details?.images.webp.image_url} alt='' />
						</div>
						<div className="anime-info__rate">
							<img src='' alt='оценить' />
							<p>Оцените сериал</p>
						</div>
						<div className="anime-info__addlist">
							<span>+ Добавить в список</span>
							<img src='dropdown' alt='' />
						</div>
					</div>
					<div className={styles['anime-info__rightside']}>
						<div className={styles['anime-info-title']}>
							<p>Erased</p>
							<span> Boku dake ga inai machi</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimePage
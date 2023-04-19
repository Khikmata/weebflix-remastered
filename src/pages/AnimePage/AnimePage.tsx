import { Link, useParams } from 'react-router-dom';
import dropdown from '../../assets/icons/dropdown.svg';
import star from '../../assets/icons/star.svg';
import { InfoBlock } from '../../components/Blocks/Info';
import { RankBlock } from '../../components/Blocks/Rank';
import { Button } from '../../components/Button';
import { AnimeApi } from '../../store/services/getAnime';
import styles from './animepage.styles.module.scss';

const AnimePage = () => {

	let { id } = useParams<string>();

	const { data: details, error: detailsErrors, isLoading: detailsLoading } = AnimeApi.useGetAnimeDetailsQuery(id ? id : '')

	return (
		<div className={styles['anime-page']}>
			<div className={styles['anime-page__background']} />
			<div className={styles['anime-page__container']}>
				<div className={styles['anime-page__info']}>
					<div className={styles['anime-info__leftside']}>
						<div className={styles['anime-info__image']}>
							<img loading='lazy' src={details?.images.webp.large_image_url || '../../assets/images/home.png'} alt='' />
						</div>
						<Button scale color='primary' marginVertical={4}>
							<img src={star} alt='оценить' />
							<p>Оцените сериал</p>
						</Button>
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
						<Button scale height={40} marginVertical={16} color='primary'><Link to={`https://www.youtube.com/watch?v=${details?.trailer.youtube_id}`}>Смотреть сейчас</Link></Button>
						{detailsLoading && <p>Загрузка описания...</p>}
						{detailsErrors && <p>Ошибка при загрузке описания...</p>}
						{
							details && <InfoBlock details={details} />
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimePage

import { IMoreDetails } from "../../../types/DetailsTypes";
import { IDetails } from "../../../types/FetchTypes";
import { TranslateGenresToRussian } from "../../../utils/Translation/TranslateGenres";
import { TranslateRatingToRussian } from "../../../utils/Translation/TranslateRating";
import { TranslateReleaseToRussian } from "../../../utils/Translation/TranslateRelease";
import { TranslateStatusToRussian } from "../../../utils/Translation/TranslateStatus";
import { TranslateTypeToRussian } from "../../../utils/Translation/TranslateTypes";
import { Button } from "../../Button";
import styles from './InfoBlock.styles.module.scss';
interface InfoBlockProps {
	details: IDetails;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ details }) => {


	return (
		<div className={styles['infoBlock']}>
			<p>Тип: <Button contentPadding={3} outlined>{(TranslateTypeToRussian(details.type))}</Button></p>
			<p>Эпизоды: {details.episodes || 0}</p>
			<p>Статус: {TranslateStatusToRussian(details.status)}</p>
			<p className={styles['infoBlock-genres']}>
				Жанры: {details.genres.map((genre: IMoreDetails) =>
					<Button color='secondary' contentPadding={3}>
						{TranslateGenresToRussian(genre.name)}
					</Button>)}
			</p>
			<p>Студия: {details.studios.map((studio: IMoreDetails) => <Button outlined contentPadding={3}>{studio.name}</Button>)}</p>
			<p>Рейтинг: {TranslateRatingToRussian(details.rating)}</p>
			<p>Длительность: {details.duration}</p>
			<p>Выпуск: {TranslateReleaseToRussian(details.season)} {details.year} </p>
		</div>
	);
}


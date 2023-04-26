
import { useState } from 'react';
import { IMoreDetails } from "../../../types/DetailsTypes";
import { IDetails } from "../../../types/FetchTypes";
import { TranslateGenresToRussian } from "../../../utils/Translation/TranslateGenres";
import { TranslateRatingToRussian } from "../../../utils/Translation/TranslateRating";
import { TranslateSeasonToRussian } from "../../../utils/Translation/TranslateRelease";
import { TranslateStatusToRussian } from "../../../utils/Translation/TranslateStatus";
import { TranslateTypeToRussian } from "../../../utils/Translation/TranslateTypes";
import { Button } from "../../Button";
import styles from './InfoBlock.styles.module.scss';
interface InfoBlockProps {
	details: IDetails;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ details }) => {

	const [openDescription, setOpenDescirpiton] = useState(false)

	return (
		<>
			<div className={styles['infoBlock']}>
				<p>Тип: <Button contentPadding={3} outlined>{(TranslateTypeToRussian(details.type))}</Button></p>
				<p>Эпизоды: {details.episodes || 0}</p>
				<p>Статус: {TranslateStatusToRussian(details.status)}</p>
				<p className={styles['infoBlock-genres']}>
					Жанры: {details.genres.map((genre: IMoreDetails, index) =>
						<Button key={index} color='secondary' contentPadding={3}>
							{TranslateGenresToRussian(genre.name)}
						</Button>)}
				</p>
				<p>Студия: {details.studios.map((studio: IMoreDetails, index) =>
					<Button key={index} outlined contentPadding={3}>
						{studio.name}
					</Button>)}
				</p>
				<p>Рейтинг: {TranslateRatingToRussian(details.rating)}</p>
				<p>Длительность: {details.duration}</p>
				<p>Выпуск: {TranslateSeasonToRussian(details.season)} {details.year} </p>

			</div>
			<div onClick={() => setOpenDescirpiton((prevstate) => !prevstate)} className={[styles['description'], styles[openDescription ? 'active' : '']].join(' ')}>
				<strong>Описание:</strong>
				<br />
				<p> {details.synopsis}</p>
			</div>
		</>
	);
}


import { IDetails, IMoreDetails } from "../../../types/GetAnimeTypes";
import { Button } from "../../Button";
import styles from './InfoBlock.styles.module.scss';
interface InfoBlockProps {
	details: IDetails;
}

enum TypeLocalisation {
	TV = "ТВ-Сериал",
	Movie = "Фильм",
}

enum StatusLocalisation {
	"Not yet aired" = "Не выходит",
	"Currently Airing" = "Онгоинг",
	"Finished Airing" = "Вышло",
}
enum GenresLocalisation {
	"Action" = "Экшен",
	"Adventure" = "Приключения",
	"Drama" = "Драма",
}
enum ReleaseLocalisation {
	"winter" = "Зима",
	"summer" = "Лето",
	"autumn" = "Осень",
	"spring" = "Весна",
}

const localizeDetails = (details: IDetails): IDetails => {

	const localizedType = TypeLocalisation[details.type as keyof typeof TypeLocalisation] || details.type;
	const localizedStatus = StatusLocalisation[details.status as keyof typeof StatusLocalisation] || details.status;
	const localizedReleases = ReleaseLocalisation[details.season as keyof typeof ReleaseLocalisation] || details.season;

	return {
		...details,
		type: localizedType,
		status: localizedStatus,
		season: localizedReleases,
	};
};

export const InfoBlock: React.FC<InfoBlockProps> = ({ details }) => {

	const localizedDetails = localizeDetails(details);

	return (
		<div className={styles['infoBlock']}>
			<p>Тип: <Button contentPadding={3} outlined>{(localizedDetails?.type)}</Button></p>
			<p>Эпизоды: {localizedDetails?.episodes || 0}</p>
			<p>Статус: {localizedDetails?.status}</p>
			<p className={styles['infoBlock-genres']}>Жанры: {localizedDetails?.genres?.map((genre: IMoreDetails) => <Button color='secondary' contentPadding={3}>{genre.name}</Button>)}</p>
			<p>Студия: {localizedDetails?.studios.map((studio: IMoreDetails) => <Button outlined contentPadding={3}>{studio.name}</Button>)}</p>
			<p>Рейтинг: {localizedDetails?.rating}</p>
			<p>Длительность: {localizedDetails?.duration}</p>
			<p>Выпуск: {localizedDetails?.season} {localizedDetails?.year} </p>
		</div>
	);
}


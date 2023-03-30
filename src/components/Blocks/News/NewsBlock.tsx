import styles from './NewsBlock.styles.module.scss'
export const NewsBlock = () => {
	return (
		<div className={styles['newsblock']}>
			<div className={styles['newsblock__content']}>
				<p>Новости</p>
				<div className={styles['newsblock__info']}>
					<img src='https://m.media-amazon.com/images/M/MV5BYzJmZjZkMjQtZjJmZC00M2JkLTg5MzktN2FkOTllNTc5MmMzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg' alt='anime-poster' />
					<p>
						Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
						Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
						В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
					</p>
				</div>
			</div>
		</div>
	)
}

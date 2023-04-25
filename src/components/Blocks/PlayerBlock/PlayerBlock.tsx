import styles from './PlayerBlock.styles.module.scss'
export const PlayerBlock = () => {
	return (
		<div className={styles['playerBlock']}>
			<h2>Онлайн-плеер</h2>
			<div className='playerBlock-player'>
				<video width='100%' height='100%' controls>
					<source src=''></source>
				</video>
			</div>
		</div>
	)
}

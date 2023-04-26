import React, { useEffect, useState } from 'react';
import { PlayerApi } from '../../../store/services/getPlayer';
import { IData, IDetails, IPlayerData, ISources } from '../../../types/FetchTypes';
import styles from './PlayerBlock.styles.module.scss';
import ReactPlayer from 'react-player';





export const PlayerBlock: React.FC<IPlayerData> = (sources) => {

	console.log(sources)
	console.log(sources.sources[3].url)
	return (
		<div className={styles['playerBlock']}>
			<h2>Онлайн-плеер</h2>
			<div className='playerBlock-player'>
				<ReactPlayer width='100%' height='640px' controls light url={sources.sources[3].url} />
			</div>
		</div >
	)
}

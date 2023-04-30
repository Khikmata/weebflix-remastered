import React from 'react';
import ReactPlayer from 'react-player';
import { IPlayerData } from '../../../types/FetchTypes';
import styles from './PlayerBlock.styles.module.scss';





export const PlayerBlock: React.FC<IPlayerData> = (sources) => {

	return (
		<div className={styles['playerBlock']}>
			<h2>Онлайн-плеер</h2>
			<div className={styles['playerBlock-player']}>
				<ReactPlayer width='clamp(200px, 100%, 1100px)' height='100%' style={{ aspectRatio: '16/9' }} controls url={sources.sources[3].url} />
				<div className={styles['playerBlock-episode__dropdown']}>
					<ul>
						<li className={styles['active']}><button >1 Серия</button> </li>
						<li><button>2 Серия</button> </li>
						<li><button>3 Серия</button> </li>
						<li><button>4 Серия</button> </li>
						<li><button>5 Серия</button> </li>
						<li><button>6 Серия</button> </li>
						<li><button>7 Серия</button> </li>
						<li><button>8 Серия</button> </li>
						<li><button>9 Серия</button> </li>
					</ul>
				</div>
			</div>
		</div >
	)
}

import React from 'react';
import styles from './Pagination.styles.module.scss';

import nextArrow from '../../../assets/icons/nextArrow.svg';
import prevArrow from '../../../assets/icons/prevArrow.svg';

interface PaginationProps {
	handleNextPage: () => void
	handlePrevPage: () => void
	hasNextPage: boolean
	pages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ handleNextPage, handlePrevPage, hasNextPage, pages }) => {
	return (
		<div className={styles['pagination']}>
			<button
				className={[styles['pagination-button'], styles[pages === 1 ? 'disabled' : '']].join(' ')}
				onClick={handlePrevPage}
			>
				<img width={12} src={prevArrow} alt='прошлая страница' />
			</button>
			<button className={[styles['pagination-button'], styles[hasNextPage === false ? 'disabled' : '']].join(' ')}
				onClick={handleNextPage}>
				<img width={12} src={nextArrow} alt='след страница' />
			</button>
		</div>
	)
}
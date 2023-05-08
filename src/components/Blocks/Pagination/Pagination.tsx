import React from 'react';
import styles from './Pagination.styles.module.scss';


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
				onClick={handleNextPage}
			>
				{'<'}
			</button>
			<button className={[styles['pagination-button'], styles[hasNextPage === false ? 'disabled' : '']].join(' ')} onClick={handlePrevPage}>
				{'>'}
			</button>
		</div>
	)
}
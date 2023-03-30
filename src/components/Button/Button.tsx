import React from 'react';
import styles from './Button.styles.module.scss';
interface ButtonProps {
	children?: React.ReactNode;
	marginVertical?: number;
	marginHorizontal?: number;
}


export const Button: React.FC<ButtonProps> = ({ children, marginHorizontal, marginVertical }) => {
	return (
		<button style={{ marginBottom: marginVertical, marginTop: marginVertical }} className={styles['button']}>{children}</button>
	)
}

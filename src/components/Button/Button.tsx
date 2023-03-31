
import React from 'react';
import styles from './Button.styles.module.scss';


interface ButtonProps {
	children?: React.ReactNode;
	marginVertical?: number;
	marginHorizontal?: number;
	color?: "primary" | "secondary";
	outlined?: boolean;
	scale?: boolean;
	height?: number;
	contentPadding?: number;
}


export const Button: React.FC<ButtonProps> = ({ children, marginHorizontal, marginVertical, color, outlined, scale, height, contentPadding }) => {
	return (
		<button
			style={{
				width: scale ? '100%' : 'auto',
				height: height,
				padding: contentPadding,

				marginBottom: marginVertical,
				marginTop: marginVertical,

				marginLeft: marginHorizontal,
				marginRight: marginHorizontal,

				border: outlined ? '1px solid #B5B5B5' : 'none',
				backgroundColor:
					(color === 'primary' && '#28646c') ||
					(color === 'secondary' && '#7d8099') ||
					('transparent')
			}}
			className={styles['button']}
		>
			{children}
		</button>
	)
}

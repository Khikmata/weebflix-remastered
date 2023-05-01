import React from 'react'
import styles from './Button.styles.module.scss'

type Color = 'primary' | 'secondary'
interface ButtonProps {
  children?: React.ReactNode
  marginVertical?: number
  marginHorizontal?: number | string
  color?: Color
  borderCol?: string
  borderWidth?: number
  outlined?: boolean
  scale?: boolean
  height?: number
  contentPadding?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  marginHorizontal,
  marginVertical,
  color,
  outlined,
  scale,
  height,
  contentPadding,
  onClick,
  borderCol,
  borderWidth,
}) => {
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

        border: outlined
          ? `${borderWidth ? borderWidth : 1}px solid ${borderCol ? borderCol : 'white'}`
          : 'none',
        backgroundColor:
          (color === 'primary' && '#28646c') ||
          (color === 'secondary' && '#7d8099') ||
          'transparent',
      }}
      className={styles['button']}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

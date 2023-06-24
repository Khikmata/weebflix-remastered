import React from 'react'
import styles from './Input.styles.module.scss'

interface ButtonProps {
  marginVertical?: number
  marginHorizontal?: number

  color?: 'primary' | 'secondary'
  outlined?: boolean
  scale?: boolean
  height?: number
  contentPadding?: string

  type?: 'range' | 'input'
  max?: number
  min?: number

  borRad?: number

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<ButtonProps> = ({
  marginHorizontal,
  marginVertical,
  color,
  outlined,
  scale,
  height,
  contentPadding,
  type,
  max,
  min,
  borRad,
  onChange,
}) => {
  return (
    <input
      style={{
        width: scale ? '100%' : 'auto',
        height: height,
        padding: contentPadding,

        marginBottom: marginVertical,
        marginTop: marginVertical,

        marginLeft: marginHorizontal,
        marginRight: marginHorizontal,

        border: outlined ? '1px solid #B5B5B5' : 'none',
        borderRadius: borRad,

        backgroundColor: (color === 'primary' && '#28646c') || (color === 'secondary' && '#7d8099') || 'transparent',
      }}
      className={styles['button']}
      onChange={onChange}
      type={type}
      max={max}
      min={min}
    />
  )
}

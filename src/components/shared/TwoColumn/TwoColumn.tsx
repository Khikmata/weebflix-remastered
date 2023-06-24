import React from 'react';
import styles from './TwoColumn.styles.module.scss';

interface TwoColumnProps {
  children: React.ReactNode;
}

export const TwoColumn: React.FC<TwoColumnProps> = ({ children }) => {
  return <div className={styles['twocolumn-container']}>{children}</div>;
};

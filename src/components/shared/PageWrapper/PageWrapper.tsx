import React from 'react';
import styles from './PageWrapper.styles.module.scss';
interface PageWrapperProps {
  children: React.ReactNode;
  source?: string;
  filled: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  source,
  filled,
}) => {
  return (
    <div className={styles['pageWrapper']}>
      <div className={styles['pageWrapper-background__overlay']} />
      <img
        src={source}
        alt="задний фон"
        loading="lazy"
        decoding="async"
        className={styles['pageWrapper-background']}
      />
      <div
        className={[
          styles['pageWrapper__container'],
          styles[filled ? 'filled' : ''],
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
};

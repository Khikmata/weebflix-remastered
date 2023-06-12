import styles from './Loading.styles.module.scss';
export const Loading = () => {
  return (
    <div>
      <div className={styles['spinner-container']}>
        <div className={styles['loading-spinner']}></div>
      </div>
    </div>
  );
};

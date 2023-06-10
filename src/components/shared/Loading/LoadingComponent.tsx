import styles from './LoadingComponent.styles.module.scss';
export const LoadingComponent = () => {
  return (
    <div>
      <div className={styles['spinner-container']}>
        <div className={styles['loading-spinner']}></div>
      </div>
    </div>
  );
};

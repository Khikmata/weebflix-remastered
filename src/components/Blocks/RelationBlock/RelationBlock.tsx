import styles from './RelationBlock.styles.module.scss'

const Card = () => {
  return (
    <>
      <div className={styles['relationBlock-content']}>
        <div className={styles['relationBlock-content__image']}>
          <img src="https://cdn.myanimelist.net/images/anime/1935/127974l.webp" alt="Обложка"></img>
        </div>
        <div className={styles['relationBlock-content__info']}>
          <strong>Lorem Ipsum</strong>
          <small>Манга / 2016</small>
          <small>Адаптация</small>
        </div>
      </div>
    </>
  )
}

export const RelationBlock = () => {
  return (
    <div className={styles['relationBlock']}>
      <Card />
      <Card />
    </div>
  )
}

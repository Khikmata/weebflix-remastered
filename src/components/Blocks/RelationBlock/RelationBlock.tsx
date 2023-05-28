import { useEffect, useState } from 'react'
import { AnimeApi } from '../../../store/services/getAnime'
import { IRelations } from '../../../types/DetailsTypes'
import { LoadingComponent } from '../../UI/Loading'
import styles from './RelationBlock.styles.module.scss'

const Card = (item: IRelations) => {

  console.log(item)

  return (
    <>
      <div className={styles['relationBlock-content']}>
        <div className={styles['relationBlock-content__image']}>
          <img src="" alt="Обложка"></img>
        </div>
        <div className={styles['relationBlock-content__info']}>
          <strong>{item.entry[0].name}</strong>
          <small>{item.entry[0].type}</small>
          <small>{item.relation}</small>
        </div>
      </div>
    </>
  )
}

export const RelationBlock = (id: any) => {


  const [skip, setSkip] = useState(true)
  const { data: relationsData, error: relationsError, isLoading: relationsLoading } = AnimeApi.useGetAnimeRelationsQuery(id.id)


  return (
    <div className={styles['relationBlock']}>
      {
        relationsLoading && <p>Идет загрузка... <LoadingComponent /></p>
      }
      {
        relationsData && relationsData.map((item: IRelations, index) => (
          <Card {...item} />
        ))
      }
      {
        relationsError && <p> Произошла ошибка при загрузке данных</p>
      }
    </div>
  )
}

import { useState } from 'react'

import { Loading } from '@components/shared'
import { AnimeDetailsApi } from '@store/services/AnimeDetailsApi'
import { IRelations } from '@store/types/DetailsTypes'
import styles from './RelationBlock.styles.module.scss'

const Card = (item: IRelations) => {
  return (
    <>
      <div className={styles['relationBlock-content']}>
        <div className={styles['relationBlock-content__image']}>
          {/* //<img src="" alt="Обложка"></img> */}
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
  const {
    data: relationsData,
    error: relationsError,
    isLoading: relationsLoading,
  } = AnimeDetailsApi.useGetAnimeRelationsQuery(id.id)

  return (
    <div className={styles['relationBlock']}>
      {relationsLoading && (
        <>
          Идет загрузка... <Loading />
        </>
      )}
      {relationsData?.map((item: IRelations) => (
        <Card key={item.relation} {...item} />
      ))}
      {relationsError && <p> Произошла ошибка при загрузке данных</p>}
    </div>
  )
}

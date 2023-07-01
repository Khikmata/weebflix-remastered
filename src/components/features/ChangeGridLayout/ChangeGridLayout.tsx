import gridIcon from '@assets/icons/GridIcon.svg'
import listIcon from '@assets/icons/ListIcon.svg'
import { CatalogueActions } from '@store/reducers/Catalogue/CatalogueSlice'
import { CatalogueLayoutType } from '@store/reducers/Catalogue/types'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import styles from './ChangeGridLayout.styles.module.scss'

export const ChangeGridLayout = () => {
  const dispatch = useAppDispatch()
  const activeLayout = useAppSelector((state) => state.catalogue.activeLayout)

  const handleChangeLayout = (layout: CatalogueLayoutType) => {
    dispatch(CatalogueActions.setActiveLayout(layout))
  }
  return (
    <div className={styles['changelayout__container']}>
      <button
        className={styles[activeLayout === 'grid' ? 'active' : '']}
        onClick={() => handleChangeLayout('grid')}
      >
        <img src={gridIcon} width={22} alt="Сеточная" />
      </button>
      <button
        className={styles[activeLayout === 'list' ? 'active' : '']}
        onClick={() => handleChangeLayout('list')}
      >
        <img src={listIcon} width={24} alt="Таблицей" />
      </button>
    </div>
  )
}

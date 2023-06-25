import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CatalogueLayoutType, CatalogueOptionsType } from './types'

interface CatalogueState {
  activeCatalogueOptionIndex: number
  activeLayout: CatalogueLayoutType
}

const initialState: CatalogueState = {
  activeCatalogueOptionIndex: 0,
  activeLayout: 'grid',
}

const slice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setActiveCatalogueOptionIndex: (state, action: PayloadAction<number>) => {
      state.activeCatalogueOptionIndex = action.payload
    },
    setActiveLayout: (state, action: PayloadAction<CatalogueLayoutType>) => {
      state.activeLayout = action.payload
    },
  },
})

export const { reducer: CatalogueReducer, actions: CatalogueActions } = slice

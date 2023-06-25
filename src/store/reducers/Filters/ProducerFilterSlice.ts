import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProducers } from '@store/types/FetchTypes'

interface producerFIlterProps {
  producersQuery: number | null
  producersDisplay: string | null
}

const initialState: producerFIlterProps = {
  producersQuery: null,
  producersDisplay: null,
}

const slice = createSlice({
  name: 'producersFilter',
  initialState,
  reducers: {
    setProducer: (state, action: PayloadAction<IProducers>) => {
      state.producersQuery = action.payload.mal_id
      state.producersDisplay = action.payload.titles[0].title
    },
    removeProducer: (state) => {
      state.producersQuery = null
      state.producersDisplay = null
    },
  },
})

export const { reducer: producersFilterReducer, actions: producersFilterActions } = slice

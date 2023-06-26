import { createSlice } from '@reduxjs/toolkit'

interface orderByFilterProps {
  orderBy: { id: number; value: string }
}

const initialState: orderByFilterProps = {
  orderBy: { id: 0, value: 'score' },
}

const slice = createSlice({
  name: 'orderFilter',
  initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload
    },
  },
})

export const { reducer: orderByFilterReducer, actions: orderByFilterActions } =
  slice

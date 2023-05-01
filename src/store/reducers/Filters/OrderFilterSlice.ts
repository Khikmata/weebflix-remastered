import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    orderBy: string
}

const initialState: CounterState = {
    orderBy: 'score',
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

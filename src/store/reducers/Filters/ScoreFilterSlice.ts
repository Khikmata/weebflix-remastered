import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    maxScore: number
    minScore: number
}

const initialState: CounterState = {
    maxScore: 10,
    minScore: 0,
}

const slice = createSlice({
    name: 'scoreFilter',
    initialState,
    reducers: {
        setMaxScore: (state, action: PayloadAction<number>) => {
            state.maxScore = action.payload
        },
        setMinScore: (state, action: PayloadAction<number>) => {
            state.minScore = action.payload
        },
    },
})

export const { reducer: scoreFilterReducer, actions: scoreFilterActions } =
    slice

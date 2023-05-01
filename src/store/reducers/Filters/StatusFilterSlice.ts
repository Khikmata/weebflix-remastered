import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    statusType: string | null
}

const initialState: CounterState = {
    statusType: '',
}

const slice = createSlice({
    name: 'statusFilter',
    initialState,
    reducers: {
        setStatusType: (state, action) => {
            state.statusType = action.payload
        },
    },
})

export const { reducer: statusFilterReducer, actions: statusFilterActions } =
    slice

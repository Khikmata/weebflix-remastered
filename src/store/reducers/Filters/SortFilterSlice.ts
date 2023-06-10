import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  sortType: string;
}

const initialState: CounterState = {
  sortType: 'desc',
};

const slice = createSlice({
  name: 'sortFilter',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
  },
});

export const { reducer: sortFilterReducer, actions: sortFilterActions } = slice;

import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  ratingQuery: string;
  ratingDisplay: string;
}

const initialState: CounterState = {
  ratingQuery: '',
  ratingDisplay: '',
};

const slice = createSlice({
  name: 'ratingFilter',
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.ratingQuery = action.payload;
      state.ratingDisplay = action.payload;
    },
    removeRating: (state) => {
      state.ratingQuery = '';
      state.ratingDisplay = '';
    },
  },
});

export const { reducer: ratingFilterReducer, actions: ratingFilterActions } =
  slice;

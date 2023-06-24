import { PayloadAction, createSlice } from '@reduxjs/toolkit';

 interface dateFilterProps {
  dateFrom: number;
  dateTo: number;
}

const initialState: dateFilterProps = {
  dateFrom: 1960,
  dateTo: 2023,
};

const slice = createSlice({
  name: 'dateFilter',
  initialState,
  reducers: {
    setDateFrom: (state, action: PayloadAction<number>) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action: PayloadAction<number>) => {
      state.dateTo = action.payload;
    },
  },
});

export const { reducer: dateFilterReducer, actions: dateFilterActions } = slice;

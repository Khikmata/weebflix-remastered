import { createSlice } from '@reduxjs/toolkit';

export interface statusFilterProps {
  statusType: string | null;
}

const initialState: statusFilterProps = {
  statusType: '',
};

const slice = createSlice({
  name: 'statusFilter',
  initialState,
  reducers: {
    setStatusType: (state, action) => {
      state.statusType = action.payload;
    },
  },
});

export const { reducer: statusFilterReducer, actions: statusFilterActions } =
  slice;

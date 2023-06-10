import { createSlice } from '@reduxjs/toolkit';

export const catalogueOptions = ['Аниме', 'Манга'];

export interface CatalogueState {
  activeCatalogueIndex: number;
}

const initialState: CatalogueState = {
  activeCatalogueIndex: 0,
};

const slice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setActiveCatalogueIndex: (state, action) => {
      state.activeCatalogueIndex = action.payload;
    },
  },
});

export const { reducer: CatalogueReducer, actions: CatalogueActions } = slice;

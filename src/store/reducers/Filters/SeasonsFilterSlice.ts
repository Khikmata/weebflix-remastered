import { PayloadAction, createSlice } from '@reduxjs/toolkit';

 interface seasonsFilterProps {
  year: string | null;
  season: string | null;
  seasonQuery: string | null;
}

const initialState: seasonsFilterProps = {
  year: null,
  season: null,
  seasonQuery: null,
};

interface SeasonData {
  year: string | null;
  season: string | null;
}

const slice = createSlice({
  name: 'seasonFilter',
  initialState,
  reducers: {
    setSeasonData: (state, action: PayloadAction<SeasonData>) => {
      state.year = action.payload.year;
      state.season = action.payload.season;
      state.seasonQuery = `${state.year}/${state.season}`;
    },
    removeSeasonData: (state, action: PayloadAction<SeasonData>) => {
      state.seasonQuery = null;
      state.year = null;
      state.season = null;
    },
  },
});

export const { reducer: seasonFilterReducer, actions: seasonFilterActions } =
  slice;

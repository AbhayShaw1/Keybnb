import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from './listings/listingsSlice.js';

export const store = configureStore({
  reducer: {
    listings:listingsReducer,
  }
});
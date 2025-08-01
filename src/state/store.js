import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from './listings/listingSlice.js';

export const store = configureStore({
  reducer: {
    listings:listingsReducer,
  }
});
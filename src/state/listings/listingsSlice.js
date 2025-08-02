import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import api from '@/api';

const initialState = {
  listings: [],
  error: null,
  favouriteListingIds: [],
  status: 'idle',
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavouriteListing: (state, action) => {
      state.favouriteListingIds.push(action.payload);
    },
    removeFavouriteListing: (state, action) => {
      state.favouriteListingIds = state.favouriteListingIds.filters(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }

        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export const { addFavouriteListing, removeFavouriteListing } =
  listingsSlice.actions;
export default listingsSlice.reducer;

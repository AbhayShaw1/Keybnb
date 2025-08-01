import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listing: [],
  error: null,
  status: 'idle',
};
export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {

  }
});

export default listingSlice.reducer;

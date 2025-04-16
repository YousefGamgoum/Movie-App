import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const showId = action.payload;
      const index = state.items.indexOf(showId);

      if (index === -1) {
        state.items.push(showId);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

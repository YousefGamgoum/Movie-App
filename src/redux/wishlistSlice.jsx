import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleWishlist: (state, action) => {
      const itemId = action.payload;
      const isItemInWishlist = state.items.some(item => item.id === itemId);
      if (isItemInWishlist) {
        state.items = state.items.filter(item => item.id !== itemId);
      } else {
        console.log(`Attempting to add item with ID ${itemId} to wishlist. Ensure the full movie object is available.`);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
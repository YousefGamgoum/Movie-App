import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './WishlistSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;

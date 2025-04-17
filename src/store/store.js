import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from './slice/wishlistSlice';

import languageReducer from './slice/language'

const store=configureStore({
    reducer:{
        wishlist:wishlistReducer,
        language: languageReducer,

    }
});

export default store;

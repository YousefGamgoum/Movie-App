import {createSlice} from '@reduxjs/toolkit'


const initialState={
    movies: [], 
}

const wishlistSlice=createSlice({
    name :'wishlist',
    initialState:initialState,
    reducers:{
        addWishlist:(state,action)=>{
            state.movies.push(action.payload);
        },
        removeWishlist:(state,action)=>{
            state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
        },

    }

});

export const {addWishlist ,removeWishlist,setWishlist}=wishlistSlice.actions;
export default wishlistSlice.reducer;



import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices.js';
import userReducer from './slices/userSlices.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
  },
});

export default store;   
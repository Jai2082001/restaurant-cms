import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices';
import userReducer from './slices/userSlices';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
  },
});

export default store;   
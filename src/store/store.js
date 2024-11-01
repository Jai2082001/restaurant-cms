import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices';
import userReducer from './slices/userSlices';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;   
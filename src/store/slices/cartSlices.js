import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch(`${process.env.REACT_APP_FETCH_LINK}/cart`, {
    method: 'GET',
    credentials: 'include', // Important to include cookies in the request
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return await response.json();
});

export const updateCart = createAsyncThunk('cart/updateCart', async (_, {getState}) => {
  const state = getState();
  const cartData = state.cart;
  const response = await fetch(`${process.env.REACT_APP_FETCH_LINK}/cart`, {
    method: 'POST',
    credentials: 'include', // Important to include cookies in the request
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartData), // Send the updated cart data
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to update cart');
  }
  return await response.json(); // Return the updated cart from the response
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity++;
     // Call the async thunk here to update the backend
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
        }
        state.totalQuantity--;
      }
   // Call the async thunk here to update the backend
    },
    singleItemRemoveFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      }
      const cartData = { items: state.items, totalQuantity: state.totalQuantity };
      updateCart(cartData); // Call the async thunk here to update the backend
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    // Call the async thunk here to update the backend
    },
    setCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    });
  }
});

export const { addToCart, removeFromCart, clearCart, singleItemRemoveFromCart } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  address: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { name, address } = action.payload;
      state.name = name;
      state.address = address;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
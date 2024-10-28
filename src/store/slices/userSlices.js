import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
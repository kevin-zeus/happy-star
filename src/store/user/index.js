import { createSlice } from '@reduxjs/toolkit';

const localUserInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  info: localUserInfo || null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = { ...action.payload };
    },
  },
  extraReducers: {

  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;

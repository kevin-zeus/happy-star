import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryList: [],
  categoryList2: [],
};

export const goodsCategorySlice = createSlice({
  name: 'goodsCategory',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryList = action.payload;
      state.categoryList2 = [];
    },
    setCategory2: (state, action) => {
      state.categoryList2 = action.payload;
    },
  },
});

export const {
  setCategory, setCategory2,
} = goodsCategorySlice.actions;

export default goodsCategorySlice.reducer;

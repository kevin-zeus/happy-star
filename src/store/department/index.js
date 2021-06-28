import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departmentList: [],
  department2List: [],
  department3List: [],
};

export const departmentSlice = createSlice({
  name: 'goodsCategory',
  initialState,
  reducers: {
    setDepartment: (state, action) => {
      state.departmentList = action.payload;
    },
    setDepartment2: (state, action) => {
      state.department2List = action.payload;
    },
    setDepartment3: (state, action) => {
      state.department3List = action.payload;
    },
  },
});

export const {
  setDepartment, setDepartment2, setDepartment3,
} = departmentSlice.actions;

export default departmentSlice.reducer;

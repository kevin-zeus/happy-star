import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appTitle: '管理平台',
  collapsed: false, // 菜单收起展开
  selectedHeaderKeys: [],
  siderMenus: [],
  headerMenus: [],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    changeAppTitle: (state, action) => {
      state.appTitle = action.payload;
    },
    changeSiderMenus: (state, action) => {
      const index = state.headerMenus.findIndex((item) => item.path === action.payload);
      state.siderMenus = state.headerMenus[index].childRoutes;
    },
    setHeaderMenus: (state, action) => {
      console.log('111', action.payload);
      state.headerMenus = [...action.payload];
    },
  },
});

export const {
  toggleCollapsed, changeAppTitle, changeSiderMenus, setHeaderMenus,
} = globalSlice.actions;

export default globalSlice.reducer;

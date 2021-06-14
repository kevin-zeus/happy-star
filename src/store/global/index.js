import { createSlice } from '@reduxjs/toolkit';

const localSiderMenus = localStorage.getItem('siderMenus');
const localHeaderMenus = localStorage.getItem('headerMenus');
const localSelectedHeaderKeys = localStorage.getItem('selectedHeaderKeys');

const initialState = {
  appTitle: '管理平台',
  collapsed: false, // 菜单收起展开
  selectedHeaderKeys: localSelectedHeaderKeys ? JSON.parse(localSelectedHeaderKeys) : [],
  siderMenus: localSiderMenus ? JSON.parse(localSiderMenus) : [],
  headerMenus: localHeaderMenus ? JSON.parse(localHeaderMenus) : [],
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
      state.selectedHeaderKeys = [state.headerMenus[index].path];
    },
    setHeaderMenus: (state, action) => {
      state.headerMenus = [...action.payload];
      if (state.siderMenus.length === 0) {
        state.siderMenus = state.headerMenus[0].childRoutes;
      }
      if (state.selectedHeaderKeys.length === 0) {
        state.selectedHeaderKeys = [state.headerMenus[0].path];
      }
      localStorage.setItem('siderMenus', JSON.stringify(state.siderMenus));
      localStorage.setItem('headerMenus', JSON.stringify(state.headerMenus));
      localStorage.setItem('selectedHeaderKeys', JSON.stringify(state.selectedHeaderKeys));
    },
  },
});

export const {
  toggleCollapsed, changeAppTitle, changeSiderMenus, setHeaderMenus,
} = globalSlice.actions;

export default globalSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';
import globalReducer from './global';
import goodsCategoryReducer from './goodsCategory';
import departmentReducer from './department';

export default configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
    goodsCategory: goodsCategoryReducer,
    department: departmentReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

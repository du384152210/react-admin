import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menus } from '@/API/testApi/index';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ""
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthMenuList.fulfilled, (state, {payload}) => {
      state.authMenuList = payload.data;
      // state.authMenuList = [] 
    })
  }
})

export const getAuthMenuList =  createAsyncThunk('auth/getMenuList', async() => {
  const res = await menus();
  return res;
})

export default authSlice.reducer;
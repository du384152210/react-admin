import { createSlice } from '@reduxjs/toolkit';
import {DEFAULT_PRIMARY} from '@/config/index';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: "vertical",
    // 当前系统语言
    language: 'enUS',
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 折叠菜单
    isCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // settingdraw
    settingDrawer: false,
    // 表格size
    tableSize: 'middle',
    // 卡片大小
    cardSize: 'small'
  },
  reducers: {
    setGlobalState: (state, {payload}) => {
      state[payload[0]] = payload[1]
    }
  }
})

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
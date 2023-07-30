import React from 'react';
import { setGlobalState } from '@/store/modules/global';
import { useDispatch } from 'react-redux';

export default function ThemeSetting() {
  const dispatch = useDispatch()
  const openDrawer = () => {
    dispatch(setGlobalState(['settingDrawer', true]))
  }

  return (
    <div className="theme-setting" onClick={openDrawer}>
      <i className="iconfont icon-zhuti toolBar-icon"></i>
    </div>
  )
}

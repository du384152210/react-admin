import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalState } from '@/store/modules/global';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';


export default function Collapsellcon() {
  // 导航缩放
  const collapsed = useSelector((state) => state.global.isCollapse)
  const dispatch = useDispatch()

  const setCollapsed = (val) => {
    dispatch(setGlobalState(["isCollapse", val]))
  }
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '16px',
        width: 50,
        height: 50,
        
      }}
    />
  )
}

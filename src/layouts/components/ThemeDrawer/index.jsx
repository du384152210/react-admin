import React from 'react';
import { Drawer, Divider, Tooltip, ColorPicker } from 'antd';
import { LayoutOutlined,CheckCircleOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import './index.scss';
import { setGlobalState } from '@/store/modules/global';
import { useSelector, useDispatch } from 'react-redux';

export default function ThemeDrawer() {
  const drawerVisible = useSelector((state) => state.global.settingDrawer);
  const layout = useSelector((state) => state.global.layout);
  const primaryCol = useSelector((state) => state.global.primary);
  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(setGlobalState(['settingDrawer', false]))
  }
  const setLayout = (val) =>{
    dispatch(setGlobalState(['layout', val]))
  }
  const changeColor = (color) => {
    dispatch(setGlobalState(['primary', color.toHexString()]))
  }
  return (
    <Drawer className='theme-drawer' title="布局设置" placement="right" closable={false} onClose={onClose} open={false || drawerVisible} width={280} >
      {/* 样式布局 */}
      <Divider>
        <LayoutOutlined /><span className='title'>布局样式</span>
      </Divider>
      <div className='layout-box'>
        <Tooltip title="横向">
          <div className={['layout-item ','layout-vertical ', layout === 'vertical' ? 'is-active': ''].join('')} onClick={() => setLayout('vertical')}>
            <div className="layout-dark"></div>
            <div className="layout-container">
              <div className="layout-light"></div>
              <div className="layout-content"></div>
            </div>
            {
              layout === 'vertical' ?<CheckCircleOutlined className='icon'/>: ''
            }
          </div>
        </Tooltip>
        <Tooltip title="经典">
          <div className={['layout-item ','layout-classic ', layout === 'classic' ? 'is-active': ''].join('')} onClick={() => setLayout('classic')}>
            <div className="layout-dark"></div>
            <div className="layout-container">
              <div className="layout-light"></div>
              <div className="layout-content"></div>
            </div>
            {
              layout === 'classic' ?<CheckCircleOutlined className='icon'/>: ''
            }
          </div>
        </Tooltip>
        <Tooltip title="横向">
          <div className={['layout-item ','layout-transverse ', layout === 'transverse' ? 'is-active': ''].join('')} onClick={() => setLayout('transverse')}>
            <div className="layout-dark"></div>
            <div className="layout-content"></div>
            {
              layout === 'transverse' ?<CheckCircleOutlined className='icon'/>: ''
            }
          </div>
        </Tooltip>
        {/* <Tooltip title="分栏">
          <div className={['layout-item ','layout-columns ', layout === 'columns' ? 'is-active': ''].join('')} onClick={() => setLayout('columns')}>
          <div className="layout-dark"></div>
          <div className="layout-light"></div>
          <div className="layout-content"></div>
            {
              layout === 'columns' ?<CheckCircleOutlined className='icon'/>: ''
            }
          </div>
        </Tooltip> */}
      </div>
      {/* 全局主题 */}
      <Divider>
        <DeploymentUnitOutlined /><span className='title'>全局主题</span>
      </Divider>
      <div>
        <div className="theme-item">
          <span>主题颜色</span>
          <ColorPicker
            value={primaryCol}
            onChange={changeColor}
          />
        </div>
      </div>
    </Drawer>
  )
}

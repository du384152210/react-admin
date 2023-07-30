import React from 'react';
import { Layout, theme } from 'antd';
import { useSelector } from 'react-redux';
import NorMenu from '../components/Menu';
import ToolBarLeft from '../components/Header/ToolBarLeft';
import ToolBarRight from '../components/Header/ToolBarRight';
import Main from '../components/Main'
import logo from '@/assets/logo-react.png';
import './index.scss';
import { initMenu } from '@/utils'

const { Header, Sider } = Layout;

export default function LayoutVertical() {
  const memuList = useSelector(state => state.auth.authMenuList);
  const title = 'React Admin';
  // 主题色
  const {token: { colorBgContainer }} = theme.useToken();
  // 导航缩放
  const collapsed = useSelector((state) => state.global.isCollapse)

  return (
    <Layout className='container vertical-container'>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: colorBgContainer}}>
        <div className="logo flx-center" >
          <img src={logo} alt='' className='logo-img'/>
          {
            !collapsed ? <span className='logo-text'>{title}</span> : ''
          }
        </div>
        <div className='scrollbar'>
          <NorMenu navItems={initMenu(memuList)} mode="inline"/>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }} className='headerStyle'>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
        <Main />
      </Layout>
    </Layout>
  )
}

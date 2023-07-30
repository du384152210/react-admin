import React from 'react';
import { Layout, theme, } from 'antd';
import NorMenu from '../components/Menu';
import ToolBarLeft from '../components/Header/ToolBarLeft';
import ToolBarRight from '../components/Header/ToolBarRight';
import Main from '../components/Main'
import logo from '@/assets/logo-react.png';
import './index.scss';
import { useSelector } from 'react-redux';
import { initMenu } from '@/utils'

const { Header, Sider } = Layout;

export default function LayoutClassic() {
  const title = 'React Admin';
  const menuList = useSelector((state) => state.auth.authMenuList)
  // 主题色
  const {token: { colorBgContainer }} = theme.useToken();
  // 导航缩放
  const collapsed = useSelector((state) => state.global.isCollapse)


  return (
    <Layout className='classic-container container'>
      <Header style={{ background: colorBgContainer }} className='headerStyle'>
        <div className="header-lf mask-image">
          <div className="logo flx-center">
            <img className="logo-img" src={logo} alt="logo" />
            <span className="logo-text">{ title }</span>
          </div>
          <ToolBarLeft />
        </div>
        <div className="header-ri">
          <ToolBarRight />
        </div>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: colorBgContainer}}>
          <div className='scrollbar'>
            <NorMenu navItems={initMenu(menuList)}  mode="inline"/>
          </div>
        </Sider>
        <Main />
      </Layout>
    </Layout>
  )
}

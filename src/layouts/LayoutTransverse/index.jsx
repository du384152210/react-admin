import React from 'react';
import { Layout, theme  } from 'antd';
import { useSelector } from 'react-redux';
import NorMenu from '../components/Menu';
import Main from '../components/Main';
import ToolBarRight from '../components/Header/ToolBarRight';
import logo from '@/assets/logo-react.png';
import './index.scss';
import { initMenu } from '@/utils';


const { Header } = Layout;

export default function LayoutTransverse() {
  // 主题色
  const {token: { colorBgContainer }} = theme.useToken();
  const menuList = useSelector(state => state.auth.authMenuList);
  const title = 'React Admin';
 
  return (
    <Layout className='transcerse-container'>
      <Header style={{ background: colorBgContainer }} className='headerStyle'>
        <div className='flex f-a-c ' style={{maxWidth: '60%'}}>
          <div className="logo flx-center">
            <img className="logo-img" src={logo} alt="logo" />
            <span className="logo-text">{ title }</span>
          </div>
          <div style={{width: 'calc(100% - 203px)'}}>
            <NorMenu mode="horizontal" navItems={initMenu(menuList)} />
          </div>
        </div>
      <ToolBarRight />
      </Header>
      <Main/>
    </Layout>
  )
}

import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import '@ant-design/icons';

export default function NorMenu(props) {
   // 路由
   const navigate = useNavigate();
   const location = useLocation();
  //  const [pathname, setPathname] = useState(location.pathname)
   const [openKeys, setOpenKeys] = useState([]);

  const rootSubmenuKeys = ['/', 'user', 'sub3', 'sub4'];

  useEffect(() => {
    const filterNav = (key) => {
      let arrObj = []
      const demoFn = (_arr) => {
        _arr && _arr.forEach(item => {
          if(key.includes(item.key)) {
            arrObj.push(item.key)
          }
          if(item.children) {
            demoFn(item.children)
          }
        });
      }
      demoFn(props.navItems)
      return arrObj
    }
    // setPathname(location.pathname)
    setOpenKeys(filterNav(location.pathname))
  }, [props.navItems,location.pathname])

   // 导航跳转
   const handleEnter = ({  key, keyPath }) => {
    navigate(key);
  }
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // function filterNav(key) {
  //   let arrObj = []
  //   const demoFn = (_arr) => {
  //     _arr.forEach(item => {
  //       if(key.includes(item.key)) {
  //         arrObj.push(item.key)
  //       }
  //       if(item.children) {
  //         demoFn(item.children)
  //       }
  //     });
  //   }
  //   demoFn(props.navItems)
  //   return arrObj
  // }

  return (
    <>
    {
      props['mode'] === 'horizontal' ? 
      <Menu
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname]}
        theme="light"
        mode={props.mode}
        selectedKeys={[location.pathname]}
        onOpenChange={onOpenChange}
        items={props.navItems}
        onClick={handleEnter}
        style={{width: '100%'}}
      /> 
      : 
      <Menu
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname]}
        theme="light"
        mode={props.mode}
        openKeys={openKeys}
        selectedKeys={[location.pathname]}
        onOpenChange={onOpenChange}
        items={props.navItems}
        onClick={handleEnter}
      />
    }
    </>
  )
}

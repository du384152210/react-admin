
// import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthorComponent } from '@/components/AuthComponent';
import DRoutes from './dynamicRouter';

// 按需导入组件
// const Home = lazy(() => import('@/pages/Home'));
// const Login = lazy(() => import('@/pages/Login'));
// const Account = lazy(() => import('@/pages/Account'));
// const AccountEdit = lazy(() => import('@/pages/Account/edit'));
// const ViewPart = lazy(() => import('@/pages/ViewPart'));
// const Cate = lazy(() => import('@/pages/Product/Cate'));
// const Layouts = lazy(() => import('@/layouts'));
// const Role = lazy(() => import('@/pages/Auth/Role'));
// const MenuMange = lazy(() => import('@/pages/System/MenuMange'));
// const SelIconPage = lazy(() => import('@/pages/component/selectIcon'));

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ViewOne from '@/pages/Dashboard/viewOne';
import ViewTwo from '@/pages/Dashboard/viewTwo';
import Layouts from '@/layouts';
import Role from '@/pages/Auth/Role';
import MenuMange from '@/pages/System/MenuMange';
import SelIconPage from '@/pages/component/selectIcon';
import Tree from '@/pages/component/tree';

let routeDictionary = {
  'home': <Home />,
  'viewOne': <ViewOne />,
  'viewTwo': <ViewTwo/>,
  'listTable': <Role />,
  'selectIcon': <SelIconPage />,
  'tree': <Tree />,
  'menuMange': <MenuMange />,
}

const renderRoutes = (routes) => {
  return <>
    {
      routes.map((route) => {
        if(route.component) {
          return ( <Route key={route.key} path={route.path} element={routeDictionary[route.component]}></Route>)
        }
        return null
      })
    }
  </>
}

const Router = () => {

  return (
    <Routes>
      <Route path='/' element={<AuthorComponent><Layouts/></AuthorComponent>}>
      <Route path='/' element={<Navigate to="/home/index" />}></Route>
        {
          renderRoutes(DRoutes)
        }
      </Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  )
}
export default Router
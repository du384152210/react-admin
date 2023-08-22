
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthorComponent } from '@/components/AuthComponent';
import DRoutes from './dynamicRouter';
import Loading from '@/components/Loading';


import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Layouts from '@/layouts';
// import ViewOne from '@/pages/Dashboard/viewOne';
// import ViewTwo from '@/pages/Dashboard/viewTwo';
// import Role from '@/pages/Auth/Role';
// import MenuMange from '@/pages/System/MenuMange';
// import SelIconPage from '@/pages/component/selectIcon';
// import Tree from '@/pages/component/tree';

// const Home = lazy(() =>import('@/pages/Home'));
// const Login = lazy(() =>import('@/pages/Login'));
// const Layouts = lazy(() =>import('@/layouts'));
const ViewOne = lazy(() =>import('@/pages/Dashboard/viewOne'));
const ViewTwo = lazy(() =>import('@/pages/Dashboard/viewTwo'));
const Role = lazy(() =>import('@/pages/Auth/Role'));
const MenuMange = lazy(() =>import('@/pages/System/MenuMange'));
const SelIconPage = lazy(() =>import('@/pages/component/selectIcon'));
const TreePage = lazy(() =>import('@/pages/component/tree'));
const UploadPage = lazy(() => import('@/pages/component/upload'));
const EditorPage = lazy(() => import('@/pages/component/editor'));
const FormPage = lazy(() => import('@/pages/component/form'));
const TablePage = lazy(() => import('@/pages/component/table'));
const SelectPage = lazy(() => import('@/pages/component/select'));
const StepsPage = lazy(() => import('@/pages/component/steps'));

const lazyLoad = (children) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}

let routeDictionary = {
  'home': lazyLoad(<Home />),
  'viewOne': lazyLoad(<ViewOne />),
  'viewTwo': lazyLoad(<ViewTwo/>),
  'listTable': lazyLoad(<Role />),
  'selectIcon': lazyLoad(<SelIconPage />),
  'tree': lazyLoad(<TreePage />),
  'menuMange': lazyLoad(<MenuMange />),
  'upload': lazyLoad(<UploadPage/>),
  'editor': lazyLoad(<EditorPage/>),
  'form': lazyLoad(<FormPage/>),
  'table': lazyLoad(<TablePage/>),
  'select': lazyLoad(<SelectPage/>),
  'steps': lazyLoad(<StepsPage/>)
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
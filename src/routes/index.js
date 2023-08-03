
// import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Account from '@/pages/Account';
import AccountEdit from '@/pages/Account/edit';
import ViewPart from '@/pages/ViewPart';
import Cate from '@/pages/Product/Cate';
import Layouts from '@/layouts';
import Role from '@/pages/Auth/Role';
import MenuMange from '@/pages/System/MenuMange';
import SelIconPage from '@/pages/component/selectIcon';

console.log(DRoutes);
// const renderRoutes = (routes) => {
//   return <>
//     {
//       routes.map((route) => {
//         if(route.component) {
//           return (
//           <Route key={route.key} path={route.path} element={<route.component/>}>
//             {route.children && renderRoutes(route.children)}
//           </Route>)
//         }else {return renderRoutes(route.children)}
//       })
//     }
//   </>
// }

const Router = () => {

  return (
    // <Suspense fallback={
    //   <div style={{ width: '100%', height: '100vh'}}>
    //     <Loading />
    //   </div>
    // }>
      <Routes>
        <Route path='/' element={<AuthorComponent><Layouts/></AuthorComponent>}>
          {/* {
            renderRoutes(DRoutes)
          } */}
          <Route path='/home/index' index element={<Home />}></Route>
          <Route path='/account/listTable' element={<Role />}></Route>
          <Route path='/system/menuMange' element={<MenuMange />}></Route>
          <Route path='/component/selectIcon' element={<SelIconPage />}></Route>

          <Route path='/dashboard/viewOne' element={<ViewPart />}></Route>
          <Route path='account/l' element={<Account />}></Route>
          <Route path='/users/account/edit' element={<AccountEdit />}></Route>
          <Route path='/product/cate' element={<Cate />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    // </Suspense>
  )
}
export default Router
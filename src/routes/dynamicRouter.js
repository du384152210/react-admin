// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import { getAuthMenuList } from '@/store/modules/auth';
// import { message } from 'antd';
// import {  removeToken, getFlatMenuList } from "@/utils";
import { menus } from '@/API/testApi';

let DRoutes = [];

function titleCase(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1);
}

function generateList (data) {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { id,path,name, children, level } = node;
    DRoutes.push({
      key: id,
      path,
      component: level === 1 && children && children.length ? '' : titleCase(name),
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};
// function initRoues (list) {
//   if (list && list.length > 0) {
//     return list.map(item => {
//         if (item.children && item.children.length > 0) {
//           return {key: item.id, path: item.path, component: item.level === 1 ? '':titleCase(item.name), children: initRoues(item.children)}
//         }
//         return {key: item.id, path: item.path, component: titleCase(item.name), children: null}
//     })
//   }
// }
/**
 * @description 初始化动态路由
 */
async function getRoutes () {
  const res = await menus();
  generateList(res.data);
}
await getRoutes();

export default DRoutes;

// export const InitDynamicRouter = async () => {
//   const menulist = useSelector(state => state.auth.authMenuList);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   await dispatch(getAuthMenuList())
  
//   if(!menulist.length) {
//     message.error({
//       type: 'error',
//       content: '当前账号无任何菜单权限，请联系系统管理员！',
//       duration: 2,
//       onClose: () => {
//         removeToken();
//         navigate('/login', {replace: true})
//       }
//     })
//     return false
//   }

//   return <></>
// }
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getAuthMenuList } from '@/store/modules/auth';
import { message } from 'antd';
import {  removeToken, getFlatMenuList } from "@/utils";

/**
 * @description 初始化动态路由
 */
export const InitDynamicRouter = async () => {
  const menulist = useSelector(state => state.auth.authMenuList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  await dispatch(getAuthMenuList())
  
  if(!menulist.length) {
    message.error({
      type: 'error',
      content: '当前账号无任何菜单权限，请联系系统管理员！',
      duration: 2,
      onClose: () => {
        removeToken();
        navigate('/login', {replace: true})
      }
    })
    return false
  }

  const list = getFlatMenuList(menulist);
  list.map(item => {
    return 
  })
  console.log();

  return <></>
}
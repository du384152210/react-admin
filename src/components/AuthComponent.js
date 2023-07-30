import { Navigate, useNavigate } from "react-router-dom";
import { getToken, removeToken, getFlatMenuList } from "@/utils";
import { useSelector, useDispatch } from 'react-redux';
import { getAuthMenuList } from '@/store/modules/auth';
import { message } from 'antd';
import { useEffect } from "react";

function AuthorComponent({children}) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const menuList = useSelector(state => state.auth.authMenuList);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMenuList = async() => {
      await dispatch(getAuthMenuList());
      console.log(menuList);
    }
    getMenuList()
  },[])
  // console.log(getFlatMenuList(menuList));
  if(menuList && !menuList.length) {
    messageApi.open({
      type: 'error',
      content: '当前账号无任何菜单权限，请联系系统管理员！',
      duration: 2,
      onClose: () => {
        removeToken();
        navigate('/login', {replace: true})
      }
    })
    return<>{contextHolder}</>;
  }else if(!getToken()) {
    return <Navigate to='/login' replace />
  }else {
    return <>{children}</>
  }
}

export {
  AuthorComponent
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Modal } from 'antd';
import './index.scss';
import { UserOutlined, FormOutlined, PoweroffOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { removeToken } from '@/utils/token';
import avatar from '@/assets/images/avatar.gif';

export default function Avatar() {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const items = [
    {
      key: '1',
      label: (
        <span className='dropItem'>个人信息</span>
      ),
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: (
        <span className='dropItem'>修改密码</span>
      ),
      icon: <FormOutlined />
    },
    {
      key: '3',
      label: (
        <span className='dropItem' onClick={logout}>退出登录</span>
      ),
      icon: <PoweroffOutlined />
    },
  ];

  // 退出登录
  function logout () {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否退出登录',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      closable: false,
      onOk: function () {
        removeToken();
        navigate('/login', {replace: true})
      }
    });
  }

  return (
    <div>
      {contextHolder}
      <Dropdown 
        menu={{items}}
        placement="bottomLeft"
        arrow
        trigger={['click']}
      >
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
      </Dropdown>
    </div>
  )
}

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined,RedoOutlined,LockOutlined } from '@ant-design/icons'
import './index.scss';
import leftLoginImg from '@/assets/images/login_left.png';
import logo from '@/assets/images/logo-react.png';
import { setToken } from '@/utils';
import { login } from '@/API/testApi/index';

const Login = () => {
  const navigate = useNavigate();
  const [user, serUser] = useState({account: 'admin', password: '123456'})
  const onFinish = async (formData) => {
    try {
      const res = await login({data:{
        account: formData.account, 
        password: formData.password,
        area: {
          ad_info: {
            adcode: 440105, //行政区划代码
            nation_code: 156, //国家代码（ISO3166标准3位数字码）
            nation: "中国", //国家
            province: "广东省", //省份
            city: "广州市", //市区/县
            district: "番禺区" //区域/镇
          },
          ip: "127.0.0.1", //定位ip
          location: {
            lat: 23.08331, //纬度
            lng: 113.3172 //经度
          }
        }
      }})
      setToken(res.data.access_token)
      message.success({
        content: res.msg,
        duration: 1,
        onClose: function() {
          navigate('/');
        }
      })
    } catch (error) {
      // const { data } = error;
    }
  }
  const onFinishFailed = (data) => {
    console.log(data);
  }
  const onReset = () => {}
  return (
    <div className='login flx-center'>
      <div className='login-container '>
        <div className='login-left'>
          <img src={leftLoginImg} alt='' className='login-left-img'/>
        </div>
        <div className='login-form'>
          <div className='login-logo'>
            <img src={logo} alt='' className='login-icon'/>
            <span className='login-text'>React-Admin</span>
          </div>
          <div>
            <Form
              validateTrigger={['onBlur', 'onChange']}
              name="basic"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="account"
                initialValue={user.account}
                rules={[
                  { required: true, message: 'Please input your phone!' },
                  { maxlen: 10 , message: 'Please input correct phone number!', validateTrigger: 'onBlur' }
                ]}
              >
                <Input size="large" prefix={<UserOutlined />} placeholder='用户名'/>
              </Form.Item>
              <Form.Item
                name="password"
                initialValue={user.password}
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password size="large" prefix={<LockOutlined />} placeholder='密码'/>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 24 }} className='flex f-j-c login-btns'>
                <Button 
                style={{marginRight: '20px', width: '48%'}} 
                htmlType="button" 
                onClick={onReset} 
                size="large" 
                icon=<RedoOutlined />
                shape="round"
                >Reset</Button>
                <Button
                style={{ width: '48%'}}
                type="primary" 
                htmlType="submit"
                shape="round"
                size="large" 
                icon=<UserOutlined />
                >Login</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
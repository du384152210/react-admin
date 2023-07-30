import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
import logo from '@/assets/logo-react.png'
import { setToken } from '@/utils'
import { login } from '@/API/testApi/index'

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
  return (
    <div className='login'>
      <Card className='login-container'>
        <img src={logo} className='login-logo' alt="" />
        <Form
          validateTrigger={['onBlur', 'onChange']}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="account"
            initialValue={user.account}
            rules={[
              { required: true, message: 'Please input your phone!' },
              { maxlen: 10 , message: 'Please input correct phone number!', validateTrigger: 'onBlur' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            initialValue={user.password}
            rules={[
              { required: true, message: 'Please input your password!' },
              // { len: 6, message: 'Please input 6-digit password', validateTrigger: 'onBlur' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
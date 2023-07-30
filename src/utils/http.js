import axios from 'axios'
import { getToken } from './token'
import { message } from 'antd'

const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : '';

const http = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token
  }
  if (config.method === 'POST') {
    config.data = JSON.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
http.interceptors.response.use(response => {
  switch (response.status) {
    case 200: case 201:
      return response.data
    case 400:
      console.log(123);
      message.error({
        content: response.data.message,
      })
      break
    case 401:
      window.location.href = '/login'
      break
    default:
      break
  }
}, error => {
  const { data } = error.response
  switch (error.response.status) {
    case 400:
      message.error({
        content: data.message,
      })
      break;
    case 401:
      message.warning({
        content: data.message,
      })
      window.location.href = '/login'
      break;
    default:
      return Promise.reject(error.response)
  }
  
})

export default http 
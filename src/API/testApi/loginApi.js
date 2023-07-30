import http from '@/utils/http';

const login = (config => {
  return http({
    url: '/admin/login/checklogin',
    method: 'POST',
    ...config
  })
})

export {
  login
}
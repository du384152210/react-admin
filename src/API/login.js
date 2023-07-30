import http from '@/utils/http';

const login = (config => {
  return http({
    url: '/login',
    method: 'POST',
    ...config
  })
})

export {
  login
}
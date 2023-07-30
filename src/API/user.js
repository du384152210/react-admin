import http from '@/utils/http';

const myInfo = (config => {
  return http({
    url: '/my',
    method: 'GET',
    ...config
  })
})

export {
  myInfo
}
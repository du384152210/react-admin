import http from '@/utils/http';

const menus = (config => {
  return http({
    url: '/admin/menus/list',
    method: 'POST',
    ...config
  })
})

export {
  menus
}
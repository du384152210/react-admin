import http from '@/utils/http';

const roleList = (config => {
  return http({
    url: '/admin/roles/listData',
    method: 'GET',
    ...config
  })
})
// 新增角色
const addRole = (config => {
  return http({
    url: '/admin/roles/store',
    method: 'POST',
    ...config
  })
})

export {
  roleList,
  addRole
}
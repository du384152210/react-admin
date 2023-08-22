import http from '@/utils/http';

const addMenu = (config => {
  return http({
    url: '/admin/menus/store',
    method: 'POST',
    ...config
  })
})
const editMenu = (config => {
  return http({
    url: '/admin/menus/update',
    method: 'POST',
    ...config
  })
})
const deleteMenu = (config => {
  return http({
    url: '/admin/menus/delete',
    method: 'POST',
    ...config
  })
})


export {
  addMenu,
  editMenu,
  deleteMenu
}
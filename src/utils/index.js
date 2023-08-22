
import { getToken, setToken, removeToken } from "./token";
import { initMenu, initTree, initSelectTree } from './menu';


/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
function getFlatMenuList(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

function formatDate (time) {
  let Y = time.getFullYear();
  let M = time.getMonth()+1;
  let D = time.getDate();
  let h = time.getHours() > 10 ? time.getHours() : '0' + time.getHours();
  let m = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes();
  let s = time.getSeconds() > 10 ? time.getSeconds() : '0' + time.getSeconds();
  return Y + '-' + M + '-' + D + ' ' + h +':' + m + ':' + s;
}

export {
  setToken,
  getToken,
  removeToken,
  getFlatMenuList,
  initMenu,
  initTree,
  initSelectTree,
  formatDate
}
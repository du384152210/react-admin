
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


export {
  setToken,
  getToken,
  removeToken,
  getFlatMenuList,
  initMenu,
  initTree,
  initSelectTree
}
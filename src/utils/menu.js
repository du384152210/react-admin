import * as Icon from "@ant-design/icons";
import React from "react";

// menuItem
function getMenuItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// treeItem
function getTreeItem( key, title, children,) {
  return {
    key,
    title,
    children
  };
}
// selectTreeItem
function getSelectTreeItem (value,title,children) {
  return {
    value,
    title,
    children
  }
}

/**
 * @description 初始化menu
 */
function initMenu (menuList) {
  if (menuList && menuList.length > 0) {
    return menuList.map(item => {
        if (item.children && item.children.length > 0) {
            return getMenuItem(item.label,item.path, item.meta.icon ? React.createElement(Icon['AppstoreOutlined']):null, initMenu(item.children))
        }
        return getMenuItem(item.label,item.path, item.meta.icon ? React.createElement(Icon['AppstoreOutlined']):null, null, )
    })
  }
}

/**
 * @description 初始化Tree
 */
function initTree (menuList, ...arg) {
  if (menuList && menuList.length > 0) {
    return menuList.map(item => {
        if (item.children && item.children.length > 0) {
            return getTreeItem(item.id, item.label, initTree(item.children))
        }
        return getTreeItem(item.id,item.label, null, )
    })
  }
}

/**
 * @description 初始化selectTree
 */
function initSelectTree (list, ...arg) {
  console.log(list);
  return list && list.map(item => {
    if (item.children && item.children.length > 0) {
        return getSelectTreeItem(item[arg[0]],item[arg[1]], initSelectTree(item[arg[2]], ...arg))
    }
    return getSelectTreeItem(item[arg[0]],item[arg[1]], null)
  })
}

export {
  initMenu,
  initTree,
  initSelectTree
}
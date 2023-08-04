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
function initMenu (list, ...arg) {
  if (list && list.length > 0) {
    return list.map(item => {
        if (item.children && item.children.length > 0) {
            return getMenuItem(item.label,item.path, item.meta.icon ? React.createElement(Icon['AppstoreOutlined']):null, initMenu(item.children))
        }
        return getMenuItem(item.label,item.path, item.meta.icon ? React.createElement(Icon['AppstoreOutlined']):null, null, )
    })
  }
}

/**
 * @description 初始化Tree
 * @param {*} arg  title,value,children
 */
function initTree (list, ...arg) {
  if (list && list.length > 0) {
    return list.map(item => {
        if (item.children && item.children.length > 0) {
            return getTreeItem(item[arg[0]], item[arg[1]], initTree(item[arg[2]], ...arg))
        }
        return getTreeItem(item[arg[0]], item[arg[1]], null)
    })
  }
}

/**
 * @description 初始化selectTree
 * @param {*} arg  title,value,children
 */
function initSelectTree (list, ...arg) {
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
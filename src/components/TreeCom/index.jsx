import React, { useState } from 'react';
import { Tree, Input, Divider, Space, Checkbox } from 'antd';

const { Search } = Input;

export default function TreeCom(props) {
  const { treeData, checkable } = props;
  const allData = [];
  const [expandedKeys, setExpandedKeys] = useState([]); // 展开的key[]
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 是否自动展开
  const [checkedKeys, setCheckedKeys] = useState([]) // 选择key[]

  generateList(treeData); // 扁平化

  // 展开隐藏key
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  // 全部展开/收起
  const onShowAll = (e) => {
    if(e.target.checked) {
      let arr = [];
      allData.forEach(item => {
        arr.push(item.key)
      })
      setExpandedKeys(arr)
    }else {
      setExpandedKeys([])
    }
  }
  // 全选/取消
  const onSelectAll = (e) => {
    if(e.target.checked) {
      let arr = [];
      allData.forEach(item => {
        arr.push(item.key)
      })
      setCheckedKeys(arr)
    }else {
      setCheckedKeys([])
    }
  }

  // 另存一份不带层级 allData 用于搜索或其他
  function generateList (data) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key,title } = node;
      allData.push({
        key,
        title,
      });
      if (node.children) {
        generateList(node.children);
      }
    }
  };

  return (

    <div>
      <Space style={{width: '100%'}} className='f-j-c'>
        <Checkbox onChange={onShowAll}>展开/收起</Checkbox>
        {
          checkable ? <Checkbox onChange={onSelectAll}>全选/全不选</Checkbox> : ''
        }
      </Space>
      <Divider/>
      <Search placeholder='搜索' allowClear/>
      <Tree 
        checkable = {checkable}
        treeData = {treeData}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        autoExpandParent={autoExpandParent}
      />
    </div>
    
  )
}

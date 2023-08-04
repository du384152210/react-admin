import React, { useState ,useMemo } from 'react';
import { Tree, Input, Divider, Space, Checkbox,Card } from 'antd';

const { Search } = Input;

export default function TreeCom(props) {
  const { treeData, checkable,showLine } = props;
  const allData = [];
  const [searchValue, setSearchValue] = useState(''); // 搜索值
  const [expandedKeys, setExpandedKeys] = useState([]); // 展开的key[]
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 是否自动展开
  const [checkedKeys, setCheckedKeys] = useState([]) // 选择key[]
  generateList(treeData); // 扁平化

  const newTreeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const strTitle = item.title;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children),
          };
        }
        return {
          title,
          key: item.key,
        };
      });
    return loop(treeData);
  }, [searchValue, treeData]);

  // 展开隐藏key
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  // 点击复选框
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys);
    props.onSelect(checkedKeys);
  }
  // 点击树节点
  const onSelect = (selectedKeys)=> {
    props.onSelect(selectedKeys);
  }
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
    let arr = [];
    if(e.target.checked) {
      allData.forEach(item => {
        arr.push(item.key)
      })
      setCheckedKeys(arr)
    }else {
      setCheckedKeys([])
    }
    props.onSelect(arr.length ? arr : [])
  }

  // 获取包含的key值
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  // 监听输入框
  const onInput = (e) => {
    const { value } = e.target;
    const newExpandedKeys = allData.map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

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
      <Search placeholder='搜索' allowClear onChange={onInput}/>
      <Card style={{marginTop: '10px'}}>
        <Tree 
        showLine = { showLine }
        checkable = {checkable}
        selectable= {!checkable}
        treeData = {newTreeData}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        onSelect={onSelect}
        />
      </Card>
    </div>
    
  )
}

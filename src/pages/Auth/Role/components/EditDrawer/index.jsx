import React, { useEffect, useRef, useState} from 'react';
import { Drawer, Form, Input, Space, Tree, Checkbox, Divider, Button } from 'antd';
import './index.scss'

// 样式
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export default function EditDrawer(props) {
  const {data ,show, tree } = props;
  const [expandedKeys, setExpandedKeys] = useState([]); // tree展开key
  const [checkedKeys, setCheckedKeys] = useState([]); // tree选中key
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 是否自动展开
  const allDataList = [];
  // 另存一份不带层级 allDataList 用于搜索
  function generateList (data) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key,title } = node;
      allDataList.push({
        key,
        title,
      });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(tree);
  console.log(allDataList);
  
  const editForm = useRef(null);

  useEffect(() => {
    editForm && editForm.current && editForm.current.resetFields();
  },[props.data])

  const onClose =() => {
    props.handleClose();
  }
  // 展开/收起
  const onShowAll = (e) => {
    if(e.target.checked) {
      let arr = [];
      allDataList.forEach(item => {
        arr.push(item.key);
      })
      setExpandedKeys(arr);
    }else {
      setExpandedKeys([]);
    }
  }
  // 是否全选
  const onSelectAll = (e) => {
    if(e.target.checked) {
      let arr = [];
      allDataList.forEach(item => {
        arr.push(item.key);
      })
      setCheckedKeys(arr);
    }else {
      setCheckedKeys([])
    }
  }
  // 手动展开tree
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  return (
    <Drawer 
    className='edit-drawer'
    style={{position: 'relative'}} 
    title={data.type === 1 ? '添加角色': '编辑角色'} 
    placement="right" open={show} width={450} 
    onClose={onClose}
    >
      <Form className='mt-15' {...layout} ref={editForm}>
        <Form.Item
          label="角色编码"
          name="code"
          initialValue={data.data ? data.data.code : ''}
          rules={[
            { required: true, message: 'Please input your phone!' },
          ]}
        >
          <Input disabled={data.type === 2}/>
        </Form.Item>
        <Form.Item
          label="角色名称"
          name="name"
          initialValue={data.data ? data.data.name : ''}
          rules={[
            { required: true, message: 'Please input role_name!' },
            { maxlen: 10 , message: 'Please input correct name!', validateTrigger: 'onBlur' }
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="角色权限"
          name="auth"
        >
          <div className='tree-box'>
            <Space style={{width: '100%'}} className='f-j-c'>
              <Checkbox onChange={onShowAll}>展开/收起</Checkbox>
              <Checkbox onChange={onSelectAll}>全选/全不选</Checkbox>
            </Space>
            <Divider />
            <Tree 
            treeData={tree} 
            checkable 
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            checkedKeys={checkedKeys}
            autoExpandParent={autoExpandParent}
            ></Tree>
          </div>
          
        </Form.Item>
      </Form>
      <div className='drawer-btns flex'>
        <Space>
        <Button>重置</Button>
        <Button type='primary'>添加</Button>
        </Space>
        
      </div>
    </Drawer>
  )
}

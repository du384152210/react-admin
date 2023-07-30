import React, { useEffect, useRef} from 'react';
import { Drawer, Form, Input, Space, Tree, Checkbox, Divider, Button } from 'antd';
import './index.scss'

export default function EditDrawer(props) {
  const {data ,show } = props;
  const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {
              title: '0-0-0-0',
              key: '0-0-0-0',
            },
            {
              title: '0-0-0-1',
              key: '0-0-0-1',
            },
            {
              title: '0-0-0-2',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {
              title: '0-0-1-0',
              key: '0-0-1-0',
            },
            {
              title: '0-0-1-1',
              key: '0-0-1-1',
            },
            {
              title: '0-0-1-2',
              key: '0-0-1-2',
            },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {
          title: '0-1-0-0',
          key: '0-1-0-0',
        },
        {
          title: '0-1-0-1',
          key: '0-1-0-1',
        },
        {
          title: '0-1-0-2',
          key: '0-1-0-2',
        },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const editForm = useRef(null)
  useEffect(() => {
    editForm && editForm.current && editForm.current.resetFields();
  },[props.data])
  const onClose =() => {
    props.handleClose()
  }
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
              <Checkbox >展开/收起</Checkbox>
              <Checkbox >全选/全不选</Checkbox>
            </Space>
            <Divider />
            <Tree treeData={treeData} checkable></Tree>
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

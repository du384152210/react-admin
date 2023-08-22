import React, { useState, useRef } from 'react';
import './index.scss';
import AddDrawer from './components/AddDrawer';
import SelectIcon from '@/components/SelectIcon';
import { Row, Col, Card, Space, Button, Divider, Input, Form, InputNumber, Radio, Switch, TreeSelect, message, Modal } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { initTree, initSelectTree, formatDate } from '@/utils';
import TreeCom from '@/components/TreeCom';
import { editMenu, addMenu, deleteMenu } from '@/API/testApi';
import { getAuthMenuList } from '@/store/modules/auth';
// import { ExclamationCircleFilled } from '@ant-design/icons'

// const { confirm } = Modal;
const key = 'updatable';
export default function MenuMange() {
  let allData = [];
  const editForm = useRef(null);
  const menuList = useSelector(state => state.auth.authMenuList);
  const { cardSize } = useSelector((state) => state.global);
  const defaultData = initTree(menuList, 'id','label','children'); // 初始化菜单数组
  const [showDrawer, setShowDrawer] = useState(false); // drawer显示
  const [showIcon, setShowIcon] = useState(false); // Icon选择显示
  const selectTreeData = initSelectTree(defaultData, 'key', 'title', 'children');
  const [editObj, setEditObj] = useState({});

  const dispatch = useDispatch();

  generateList(menuList);
  // 关闭drawer
  const onCloseDrawer = (val) => {
    setShowDrawer(val);
  }
  const handleSelIcon = () => {
    setShowIcon(true);
  }
  const onCloseIconModel = (key) => {
    setShowIcon(false);
    if(key) editForm.current.setFieldsValue({
      icon: key
    });
  }
  const onSelect = (key) => {
    let res = allData.filter(item => {return item.id === parseInt(key[0])})[0];
    setEditObj({...res});
    if(res) {
      editForm && editForm.current && editForm.current.setFieldsValue({
        parent_id: res.parent_id === 0 ? '' : res.parent_id,
        title: res.meta.title,
        icon: res.meta.icon,
        name: res.name,
        component: res.component,
        path: res.path,
        sort: res.sort,
        isHide: res.meta.isHide,
        isLink: res.meta.isLink ? true: false,
        isFull: res.meta.isFull
      })
    }else {
      setEditObj({})
      editForm.current?.resetFields();
    }
    
  }
  const onReset = () => {
    editForm.current?.resetFields();
  };
  const onFinish = (data) => {
    let obj = {
      component: data.component,
      label: data.title,
      level: data.parent_id ? 2 : 1,
      meta: {
        icon: data.icon,
        isFull: data.isFull,
        isHide: data.isHide,
        isLink: data.isLink,
        isAffix: false,
        isKeepAlive: true,
        title: data.title,
      },
      updated_time: formatDate(new Date())
    }
    let newObj = Object.assign({}, editObj, obj)
    setEditObj({...newObj})
    editMenuApi(newObj);
  }
  const handleDeleteMenu = () => {
    message.error('权限不足');
    return;
    // confirm({
    //   title: '是否确认删除?',
    //   icon: <ExclamationCircleFilled />,
    //   content: '',
    //   onOk() {
    //     deleteMenuApi(editObj.id);
    //   },
    //   onCancel() {
    //     console.log('取消');
    //   },
    // });
    
  }
  function generateList (menuList) {
    for (let i = 0; i < menuList.length; i++) {
      const node = menuList[i];
      const newObj = JSON.parse(JSON.stringify(node));
      delete newObj.children;
      allData.push(newObj);
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  //---------------------请求接口 api----------------------
  const editMenuApi = async (data)=> {
    message.open({key, type: 'loading',content: '更新中...'})
    const res = await editMenu({data})
    if(res.code === 200) {
      message.open({key, type: 'success',content: res.msg})
      await dispatch(getAuthMenuList());
    }else {
      message.open({key, type: 'error', content: res.msg})
    }
  }
  const addMenuApi = async (data)=> {
    const res = await addMenu({data})
    if(res.code === 200) {
      message.open({key, type: 'success',content: res.msg})
      await dispatch(getAuthMenuList());
      setShowDrawer(false);
    }else {
      message.open({key, type: 'error', content: res.msg})
    }
  }
  const deleteMenuApi = async (id) => {
    const res = await deleteMenu({data: {id}})
    if(res.code === 200) {
      message.open({key, type: 'success',content: res.msg})
      await dispatch(getAuthMenuList());
    }else {
      message.open({key, type: 'error', content: res.msg})
    }
  }
  
  
  return (
    <Row gutter={[16,16]}>
      <Col span={8}>
        <Card size={cardSize}>
          <div className='MenuMange-left'>
            <Space>
              <Button type="primary" icon=<FileAddOutlined /> onClick={() => onCloseDrawer(true)} >添加菜单</Button>
            </Space>
          </div>
          <TreeCom 
            treeData={defaultData}
            onSelect={onSelect}
          />
        </Card>
      </Col>
      <Col span={16}>
        <Card title={ editObj.parent_id ? '编辑菜单' : '编辑目录' }
        extra={<Button type="link" disabled={!editObj.id} onClick={handleDeleteMenu}>{ editObj.parent_id ? '删除菜单' : '删除目录' }</Button>}
        size={cardSize}
        >
          <Form 
            style={{ maxWidth: 600,}}
            labelCol={{ span: 4, }}
            wrapperCol={{ span: 20 }}
            ref={editForm}
            onFinish={onFinish}
          >
            <Divider orientation="left" style={{marginTop: 0}}>基本设置</Divider>
            <Form.Item
              name="parent_id"
              label="上级目录"
            >
              <TreeSelect showSearch allowClear treeData={selectTreeData}/>
            </Form.Item>
            <div className='flex f-j-s item-row'>
              <Form.Item name="title" label="标题" 
              labelCol={{span:8}} wrapperCol={{span: 16,}}
              rules={[
                { required: true, message: '请填写标题' },
              ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item name="icon" label="图标名称" 
              labelCol={{span:8}} wrapperCol={{span: 16}}
              rules={[
                { required: true, message: '请选择图标' },
              ]}
              >
                <Input onClick={handleSelIcon} readOnly/>
              </Form.Item>
            </div>
            <div className='flex f-j-s item-row'>
              <Form.Item name="name" label="组件名" tooltip="组件名称 如 authButton" 
              labelCol={{span:8}} wrapperCol={{span: 16,}}
              rules={[
                { required: true, message: '请填写组件名' },
              ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item name="component" label="组件路径" tooltip="组件路径 如 /auth/button/index" 
              labelCol={{span:8}} wrapperCol={{span: 16,}}
              rules={[
                { required: true, message: '请填写组件路径' },
              ]}
              >
                <Input/>
              </Form.Item>
            </div>
            <div className='flex f-j-s item-row'>
              <Form.Item name="path" label="路由" tooltip="路由path 如/auth/button" 
              labelCol={{span:8}} wrapperCol={{span: 16,}}
              rules={[
                { required: true, message: '请填写路由' },
              ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item name="sort" label="显示排序" labelCol={{span:8}} wrapperCol={{span: 16}} >
                <InputNumber/>
              </Form.Item>
            </div>
            <Divider orientation="left" style={{marginTop: 0}}>功能设置</Divider>
            <div className='flex f-j-s item-row'>
              <Form.Item name="isHide" label="展示状态" tooltip="隐藏则不展示在菜单栏" labelCol={{span:8}} wrapperCol={{span: 16}} >
                <Radio.Group options={[{label: '显示',value:false},{label: '隐藏',value:true}]} optionType="button" />
              </Form.Item>
              <Form.Item name="isLink" label="是否跳转" tooltip="是否外链网页" labelCol={{span:8}} wrapperCol={{span: 16}} valuePropName="checked">
                <Switch/>
              </Form.Item>
            </div>
            <div className='flex f-j-s item-row'>
              <Form.Item name="isFull" label="是否填充" tooltip="是否填充" labelCol={{span:8}} wrapperCol={{span: 16}} valuePropName="checked">
                <Switch/>
              </Form.Item>
            </div>
            <Form.Item style={{textAlign: 'center'}}>
                <Space>
                  <Button htmlType="button" onClick={onReset}>重置</Button>
                  <Button type='primary' htmlType="submit">保存修改</Button>
                </Space>
                
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <AddDrawer show={showDrawer} selectTreeData={selectTreeData} close={onCloseDrawer} add={addMenuApi}/>
      <SelectIcon show={showIcon} onClose={onCloseIconModel}/>
    </Row>
  )
}

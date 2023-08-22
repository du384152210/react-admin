import React, { useRef, useEffect,useState } from 'react';
import './index.scss';
import { Button, Divider, Input, Form, InputNumber, Radio, Switch, TreeSelect, Drawer } from 'antd';
import SelectIcon from '@/components/SelectIcon';

export default function AddDrawer(props) {
  const { selectTreeData, show } = props;
  const addForm = useRef(null);
  const [showIcon, setShowIcon] = useState(false); // Icon选择显示

  // 图标选择
  const handleSelIcon = () => {
    setShowIcon(true);
  }
  const onCloseIconModel = (key) => {
    setShowIcon(false);
    if(key) addForm.current.setFieldsValue({
      icon: key
    });
  }

  // 添加弹框关闭
  const onclose = () => {
    props.close(false)
  }
  // 提交表单
  const onFinish = (formData) => {
    let obj = {
      "parent_id": formData.parent_id ? formData.parent_id : 0, //父级
      "level": formData.parent_id ? 1 : 2, //级别
      "path": formData.path, //路由
      "name": formData.name, //组件名
      "component": formData.component, //组件路劲
      "meta": {
        "icon": formData.icon, //icon图标
        "title": formData.title, //标题
        "isLink": formData.isLink, //是否跳转（true：是；false：否）
        "isHide": formData.isHide, //是否隐藏（true：是；false：否）；
        "isFull": formData.isFull, //是否填充（true：是；false：否）
        "isAffix": false, //是否Affix（true：是；false：否）
        "isKeepAlive": true
      }, //meta 对象参数
      "auth_botton": [
      "add"
      ], //按钮权限
      "label": formData.title, //label 值
      "is_show": 1, //是否展示（1：显示；2：隐藏）
      "sort": formData.sort //排序（默认99）
    }
    props.add(obj);
  }
  const onReset = () => {
    addForm.current?.resetFields();
  };

  useEffect(() => {
    addForm.current?.resetFields();
  },[show])

  return (
    <>
      <Drawer title='添加菜单' width={600} open={show} className='menu-addDrawer' onClose={onclose}>
        <Form 
          style={{ maxWidth: 600,}}
          labelCol={{ span: 4, }}
          wrapperCol={{ span: 20 }}
          ref={addForm}
          onFinish={onFinish}
        >
          <Divider orientation="left" style={{marginTop: 0}}>基本设置</Divider>
          <Form.Item
            label="上级目录"
            name="parent_id"
          >
            <TreeSelect showSearch allowClear treeData={selectTreeData}/>
          </Form.Item>
          <div className='flex f-j-s item-row'>
            <Form.Item 
            label="标题" name="title" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            rules={[
              { required: true, message: '请填写标题' },
            ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item 
            label="图标名称" name="icon" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            rules={[
              { required: true, message: '请选择图标名称' },
            ]}
            >
              <Input readOnly onClick={handleSelIcon}/>
            </Form.Item>
          </div>
          <div className='flex f-j-s item-row'>
            <Form.Item label="组件名" name="name" tooltip="组件名称 如 authButton" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            rules={[
              { required: true, message: '请填写组件名' },
            ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item label="组件路径" name="component" tooltip="组件路径 如 /auth/button/index" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            rules={[
              { required: true, message: '请填写组件路径' },
            ]}
            >
              <Input/>
            </Form.Item>
          </div>
          <div className='flex f-j-s item-row'>
            <Form.Item label="路由" name="path" tooltip="路由path 如/auth/button" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            rules={[
              { required: true, message: '请填写路由' },
            ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item label="显示排序" name="sort" labelCol={{span:8}} wrapperCol={{span: 16}}>
              <InputNumber/>
            </Form.Item>
          </div>
          <Divider orientation="left" style={{marginTop: 0}}>功能设置</Divider>
          <div className='flex f-j-s item-row'>
            <Form.Item label="展示状态" 
            name="isHide" 
            tooltip="隐藏则不展示在菜单栏" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            initialValue={true}
            >
              <Radio.Group options={[{label: '显示',value:true},{label: '隐藏',value:false}]} optionType="button" />
            </Form.Item>
            <Form.Item 
            label="是否跳转" name="isLink" valuePropName="checked" 
            tooltip="是否外链网页" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            initialValue={false}
            >
              <Switch/>
            </Form.Item>
          </div>
          <div className='flex f-j-s item-row'>
            <Form.Item 
            label="是否填充" name="isFull" valuePropName="checked" 
            tooltip="是否填充" 
            labelCol={{span:8}} wrapperCol={{span: 16}}
            initialValue={false}
            >
              <Switch/>
            </Form.Item>
          </div>
          <div className='drawer-bottom-btns flex'>
            <Form.Item style={{marginBottom: 0, marginRight:'20px'}} wrapperCol={{span: 4}}>
              <Button type='primary' htmlType="submit">提交</Button>
            </Form.Item>
            <Form.Item style={{marginBottom: 0}} wrapperCol={{span: 4}}>
              <Button htmlType="button" onClick={onReset}>重置</Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
      <SelectIcon show={showIcon} onClose={onCloseIconModel}/>
    </>
    
  )
}

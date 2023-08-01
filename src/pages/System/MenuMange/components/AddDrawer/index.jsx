import React, { useMemo, useState } from 'react';
import './index.scss';
import { Button, Divider, Input, Form, InputNumber, Radio, Switch, TreeSelect, Drawer } from 'antd';
import { addMenu } from '@/API/testApi'
// import {AlignLeftOutlined, FileAddOutlined} from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import {initTree, initSelectTree} from '@/utils'

export default function AddDrawer(props) {
  const { selectTreeData, show } = props;
  const onclose = () => {
    props.close(false)
  }
  const onFinish = (formData) => {
    console.log(formData);
    addMenuApi();
  }
  const addMenuApi = async()=> {
    let obj = {
      "parent_id": 16, //父级
      "level": 2, //级别
      "path": "/dashboard/viewOne", //路由
      "name": "dashboard/viewOne", //组件名
      "component": "/dashboard/viewOne/index", //组件路劲
      "meta": {
      "icon": "FundProjectionScreenOutlined", //icon图标
      "title": "数据可视化-1", //标题
      "isLink": false, //是否跳转（true：是；false：否）
      "isHide": false, //是否隐藏（true：是；false：否）；
      "isFull": true, //是否填充（true：是；false：否）
      "isAffix": false, //是否Affix（true：是；false：否）
      "isKeepAlive": true
      }, //meta 对象参数
      "auth_botton": [
      "add"
      ], //按钮权限
      "label": "数据可视化-1", //label 值
      "is_show": 1, //是否展示（1：显示；2：隐藏）
      "sort": 99 //排序（默认99）
      }
    // const res = await addMenu({data: obj})
    // console.log(res);
  }
  return (
    <Drawer title='添加目录' width={600} open={show} className='menu-addDrawer' onClose={onclose}>
      <Form 
        style={{ maxWidth: 600,}}
        labelCol={{ span: 4, }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
      >
        <Divider orientation="left" style={{marginTop: 0}}>基本设置</Divider>
        <Form.Item
          tooltip="This is a required field"
          label="上级目录"
          name="parent_id"
          initialValue={''}
        >
          <TreeSelect showSearch allowClear treeData={selectTreeData}/>
        </Form.Item>
        <div className='flex f-j-s item-row'>
          <Form.Item 
          label="标题" name="label" 
          labelCol={{span:8}} wrapperCol={{span: 16}}
          // rules={[
          //   { required: true, message: '请填写标题' },
          // ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item 
          label="图标名称" name="icon" 
          labelCol={{span:8}} wrapperCol={{span: 16}}
          // rules={[
          //   { required: true, message: '请选择图标名称' },
          // ]}
          >
            <Input readOnly/>
          </Form.Item>
        </div>
        <div className='flex f-j-s item-row'>
          <Form.Item label="组件名" name="name" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Input/>
          </Form.Item>
          <Form.Item label="组件路径" name="component" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Input/>
          </Form.Item>
        </div>
        <div className='flex f-j-s item-row'>
          <Form.Item label="路由" name="path" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Input/>
          </Form.Item>
          <Form.Item label="显示排序" name="sort" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16}}>
            <InputNumber/>
          </Form.Item>
        </div>
        <Divider orientation="left" style={{marginTop: 0}}>功能设置</Divider>
        <div className='flex f-j-s item-row'>
          <Form.Item label="展示状态" name="is_show" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Radio.Group options={[{label: '显示',value:true},{label: '隐藏',value:false}]} optionType="button" />
          </Form.Item>
          <Form.Item 
          label="是否跳转" name="isLink" valuePropName="checked" 
          tooltip="This is a required field" 
          labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Switch/>
          </Form.Item>
        </div>
        <div className='flex f-j-s item-row'>
          <Form.Item 
          label="是否隐藏" name="isHide" valuePropName="checked" 
          tooltip="This is a required field" 
          labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Switch/>
          </Form.Item>
          <Form.Item 
          label="是否填充" name="isFull" valuePropName="checked" 
          tooltip="This is a required field" 
          labelCol={{span:8}} wrapperCol={{span: 16}}>
            <Switch/>
          </Form.Item>
        </div>
        <div className='drawer-bottom-btns flex'>
          <Form.Item style={{marginBottom: 0, marginRight:'20px'}} wrapperCol={{span: 4}}>
            <Button type='primary' htmlType="submit">提交</Button>
          </Form.Item>
          <Form.Item style={{marginBottom: 0}} wrapperCol={{span: 4}}>
            <Button>重置</Button>
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}

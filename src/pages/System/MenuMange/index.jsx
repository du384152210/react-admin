import React, { useMemo, useState } from 'react';
import './index.scss';
import AddDrawer from './components/AddDrawer';
import SelectIcon from '@/components/SelectIcon'
import { Row, Col, Card, Space, Button, Divider, Input, Tree, Form, InputNumber, Radio, Switch, TreeSelect } from 'antd';
import {AlignLeftOutlined, FileAddOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {initTree, initSelectTree} from '@/utils';

const { Search } = Input;

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

export default function MenuMange() {
  const menuList = useSelector(state => state.auth.authMenuList);
  const defaultData = initTree(menuList, 'id','label','children'); // 初始化菜单数组
  const [expandedKeys, setExpandedKeys] = useState([]); // tree展开key
  const [searchValue, setSearchValue] = useState(''); // 搜索值
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 是否自动展开
  const [showAll, setShowAll] = useState(false); // 全部展开/收起
  const [showDrawer, setShowDrawer] = useState(false); // drawer显示
  const [showIcon, setShowIconr] = useState(false); // Icon选择显示
  const [icon, setIcon] = useState(); // Icon选择显示
  const allDataList = []; 
  generateList(defaultData); // 扁平化

  const treeData = useMemo(() => {
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
    return loop(defaultData);
  }, [searchValue,defaultData]);

  const selectTreeData = initSelectTree(defaultData, 'key', 'title', 'children');
  // 手动展开tree
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  // 监听输入框
  const onChange = (e) => {
    const { value } = e.target;
    const newExpandedKeys = allDataList.map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
  // 展示全部
  const handleShowAll = () => {
    if(showAll) {
      setExpandedKeys([])
      setShowAll(false)
    }else {
      let arr = [];
      allDataList.forEach(item => {
        arr.push(item.key)
      })
      setExpandedKeys(arr)
      setShowAll(true)
    }
    
  }
  // 关闭drawer
  const onCloseDrawer = (val) => {
    setShowDrawer(val)
  }
  const handleSelIcon = () => {
    setShowIconr(true)
  }
  const onCloseIconModel = (key) => {
    setShowIconr(false)
    if(key) setIcon(key)
  }
 

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
  
  return (
    <Row gutter={[16,16]}>
      <Col span={8}>
        <Card>
          <div className='MenuMange-left'>
            <Space>
              <Button type="primary" icon=<FileAddOutlined /> onClick={() => onCloseDrawer(true)}>添加菜单</Button>
              <Button type="primary" ghost icon=<AlignLeftOutlined /> onClick={handleShowAll}>{showAll? '全部收起' : '全部展开'}</Button>
            </Space>
          </div>
          <Divider></Divider>
          <Search
            style={{
              marginBottom: 8,
            }}
            placeholder="Search"
            onChange={onChange}
          />
          <Tree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={treeData}
          />
        </Card>
      </Col>
      <Col span={16}>
        <Card title="编辑目录" 
        extra={<Button type="link">删除目录</Button>}
        >
          <Form 
            style={{ maxWidth: 600,}}
            labelCol={{ span: 4, }}
            wrapperCol={{ span: 20 }}
          >
            <Divider orientation="left" style={{marginTop: 0}}>基本设置</Divider>
            <Form.Item
              tooltip="This is a required field"
              label="上级目录"
            >
              <TreeSelect showSearch allowClear treeData={selectTreeData}/>
            </Form.Item>
            <div className='flex f-j-s item-row'>
              <Form.Item label="标题" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Input/>
              </Form.Item>
              <Form.Item label="图标名称" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Input onClick={handleSelIcon} value={icon} readOnly/>
              </Form.Item>
            </div>
            <div className='flex f-j-s item-row'>
              <Form.Item label="组件名" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Input/>
              </Form.Item>
              <Form.Item label="组件路径" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Input/>
              </Form.Item>
            </div>
            <div className='flex f-j-s item-row'>
              <Form.Item label="路由" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Input/>
              </Form.Item>
              <Form.Item label="显示排序" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <InputNumber/>
              </Form.Item>
            </div>
            <Divider orientation="left" style={{marginTop: 0}}>功能设置</Divider>
            <div className='flex f-j-s item-row'>
              <Form.Item label="展示状态" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Radio.Group options={[{label: '显示',value:true},{label: '隐藏',value:false}]} optionType="button" />
              </Form.Item>
              <Form.Item label="是否跳转" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Switch/>
              </Form.Item>
            </div>
            <div className='flex f-j-s item-row'>
              <Form.Item label="是否隐藏" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Switch/>
              </Form.Item>
              <Form.Item label="是否填充" tooltip="This is a required field" labelCol={{span:8}} wrapperCol={{span: 16,}}>
                <Switch/>
              </Form.Item>
            </div>
            <Form.Item style={{textAlign: 'center'}}>
                <Button type='primary'>保存修改</Button>
            </Form.Item>
          </Form>
          
          
        </Card>
      </Col>
      <AddDrawer show={showDrawer} selectTreeData={selectTreeData} close={onCloseDrawer}/>
      <SelectIcon show={showIcon} close={onCloseIconModel}/>
    </Row>
  )
}

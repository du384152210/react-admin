import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, PlusCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Breadcrumb, Card, Input, Row, Select, Space, Button, Table, Tag, Switch, Modal, Image,Form, Col, Drawer } from 'antd'
import logo from '@/assets/logo-react.png'

const Cate =() => {
  const data = [
    {
      key: 1,
      name: `款式选择`,
      date: '',
      tags: [],
      children: [
        {
          key: 11,
          name: `休闲款`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['休闲', 'Leisure'],
        },
        {
          key: 12,
          name: `运动款`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['运动', 'Sport'],
        }
      ]
    },
    {
      key: 2,
      name: `分类选择`,
      date: '',
      tags: [],
      children: [
        {
          key: 21,
          name: `T恤`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['T恤', 'T-shirt'],
        },
        {
          key: 22,
          name: `帽子`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['帽子', 'hat'],
        }
      ]
    }
  ] //表格数据
  const sharedOnCell = (_, index) => {
    if(_.children) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };

  const [listData, setListData] = useState(data)
  const [loading, setLoading] = useState(false)
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      onCell: (_, index) => ({
        colSpan: _.children ? 6 : 1,
      }),
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      width: 100,
      key: 'logo',
      onCell: sharedOnCell,
      render: (text) => <Image src={text} alt='' style={{ width: 40, height: 40 }} />,
    },
    {
      title: '上/下架',
      dataIndex: 'state',
      width: 150,
      key: 'state',
      onCell: sharedOnCell,
      render: (text, _, index) => {
        return (
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text} onChange={()=>changeState(index)} />
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      width: 200,
      key: 'date',
      sorter: (a, b) => a.date - b.date,
      onCell: sharedOnCell,
    },
    {
      title: '标签',
      key: 'tags',
      width: 220,
      dataIndex: 'tags',
      onCell: sharedOnCell,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 3 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      onCell: sharedOnCell,
      render: (_, record, index) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>删除</Button>
          
        </Space>
      ),
    },
  ];
  const handleAdd = () => {

  }
  const changeState = () => {}
  const handleEdit = () => {}
  const handleDelete = () => {}
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link>,},
          { title: '分类列表',}
        ]}
      />
      <Card className='mt-15'>
        <Row>
          <Space>
            <Input style={{ width: 200 }} placeholder="Basic usage" />
            <Select
              defaultValue="lucy"
              style={{ width: 200,}}
              allowClear
              options={[
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
              ]}
            />
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => handleAdd()}>添加</Button>
            <Button  icon={<SyncOutlined />}>刷新</Button>
          </Space>
         </Row>
         <Table className='mt-15'
           columns={columns}
           dataSource={listData}
           loading={loading}
           size="middle"
           rowSelection
           scroll={{
             y: 600,
             x: 1200
           }}
         />
      </Card>
    </div>
  )
}
export default Cate

import React, {useEffect ,useState} from 'react';
import { Card, Row, Col, Input, Button, Table, Space } from 'antd';
import {SearchOutlined ,PlusCircleOutlined} from '@ant-design/icons';
import { roleList } from '@/API/testApi/';
import EditDrawer from './components/EditDrawer'

export default function Role() {
  const columns = [
    {
      title: '角色编号',
      dataIndex: 'key',
      width: 100,
      key: 'key',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      width: 150,
      key: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      width: 150,
      key: 'code',
    },
    {
      title: '备注',
      key: 'desc',
      width: 200,
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'updated_time',
      width: 200,
      key: 'updated_time',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record, index) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>删除</Button>
        </Space>
      ),
    },
  ];

  function handleEdit(record) {
    seteditObj({type: 2, data: record})
    setdrawShow(true)
  }
  function handleDelete() {

  }
  function handleAddRole() {
    seteditObj({type: 1, data: {}})
    setdrawShow(true)
  }

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [editObj, seteditObj] = useState({})
  const [drawShow, setdrawShow] = useState(false)
  useEffect(() => {
    const getList = async() => {
      setLoading(true)
      const res = await roleList({params: {page:1, keywords: '', status: ''}})
      setLoading(false)
      setList(res.data.list.map(item => {return {key: item.id, ...item}}))
    }
    getList()
  },[])
  const drawClose = () => {
    setdrawShow(false)
  }
  return (
    <Row gutter={[16,16]}>
      <EditDrawer data={editObj} show={drawShow} handleClose={drawClose}/>
      <Col span={24}>
        <Card>
        <Space style={{flexWrap: 'wrap'}}>
          <Input style={{ width: 200 }} placeholder="Basic usage" />
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Space>
          
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <div className='flex f-j-s f-a-c'>
            <Button type="primary"  icon={<PlusCircleOutlined />} onClick={handleAddRole}>添加角色</Button>
          </div>
          <Table
            className='mt-15'
            columns={columns}
            dataSource={list}
            loading={loading}
            size="middle"
            rowSelection
            scroll={{
              y: 600,
              x: 1200
            }}
          />
        </Card>
      </Col>
    </Row>
  )
}

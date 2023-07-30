import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { SearchOutlined, PlusCircleOutlined, SyncOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Breadcrumb, Card, Input, Row, Select, Space, Button, Table, Tag, Switch, Modal, Image,Form, Col, Drawer } from 'antd'
import logo from '@/assets/logo-react.png'
import './index.scss'

function Account() {
  const data = [] //表格数据
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      code: `Y000${i}`,
      name: `John Brown${i}`,
      avatar: logo,
      state: false,
      age: i,
      phone: '13612121212',
      date: '2020-11-15 18:16:10',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    })
  }
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      width: 100,
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      render: (text) => <a href='javascript'>{text}</a>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      width: 100,
      key: 'avatar',
      render: (text) => <Image src={text} alt='' style={{ width: 40, height: 40 }} />,
    },
    {
      title: 'State',
      dataIndex: 'state',
      width: 150,
      key: 'state',
      render: (text, _, index) => {
        return (
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text} onChange={()=>changeState(index)} />
        )
      }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 100,
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: 150,
      key: 'phone',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
      key: 'date',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 250,
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      width: 220,
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
  const rowData = {
    user: {
      name: '',
      account: '',
      password: ''
    },
    authority: [
      {id: 1, text:'首页', checkList: [
        {id:'1-1', value: '首页',checked: true}
      ]},
      {id: 2, text:'用户管理', checkList: [
        {id:'2-1', value: '全部',checked: true},
        {id:'2-2', value: '账号列表',checked: true},
        {id:'2-3', value: '用户列表',checked: true},
        {id:'2-4', value: '客服列表',checked: true},
      ]},
      {id: 3, text:'产品管理', checkList: [
        {id:'3-1', value: '全部',checked: true},
        {id:'3-2', value: '分类列表',checked: true},
        {id:'3-3', value: '商品列表',checked: true},
      ]},
      {id: 4, text:'订单管理', checkList: [
        {id:'4-1', value: '全部',checked: true},
        {id:'4-2', value: '订单列表',checked: true},
      ]},
    ]
  }

  const [listData, setListData] = useState(data)
  const [modal, contextHolder] = Modal.useModal()
  const [hasData, setHasData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) // 编辑添加
  const [editData, setEditData] = useState(rowData) // 编辑添加数据
  const [editType, setEditType] = useState(1)
  const navigate = useNavigate()

  const changeState = (index) => {
    const res = [...listData]
    res[index].state = !res[index].state
    setListData(res)
  }
  const changeHasData = (newHasData) => {
    setLoading(true)
    setTimeout(() => {
      setHasData(newHasData)
      setLoading(false)
    }, 1000);
    
  }
  const handleDelete = (key) => {
    const res = [...listData]
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除该条数据',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      closable: false,
      onOk: function () {
        const result = res.filter(item => item.key !== key)
        setListData(result)
      }
    });
  }
  const handleAdd = () => {
    setEditType(1)
    setIsModalOpen(true)
  }
  const handleEdit =() => {
    setEditType(2)
    setIsModalOpen(true)
  }
  const handleEditOk = () => {

  }
  const handleEditCancel = () => {
    setIsModalOpen(false)
  }
  const handleChangeAuth = (pidx,sidx) => {
    let data = JSON.parse(JSON.stringify(editData))
    data.authority[pidx].checkList[sidx].checked = !data.authority[pidx].checkList[sidx].checked
    if(pidx > 0) {
      if(sidx !== 0) {
        const list = data.authority[pidx].checkList.filter((item,index) => {
          return(index !==0 && item.checked)
        })
        if(list.length !== data.authority[pidx].checkList.length-1) {
          data.authority[pidx].checkList[0].checked = false
        }else {
          data.authority[pidx].checkList[0].checked = true
        }
      }else {
        data.authority[pidx].checkList.forEach((item,index) => {
          item.checked = data.authority[pidx].checkList[0].checked
        })
      }
    }
    setEditData({...data})
  }
  const onFinish = (data) => {
    console.log(data);
  }
 
   return (
     <div>
      <Breadcrumb
        items={[
          { title: <Link to="/">首页</Link>,},
          { title: '账号列表',}
        ]}
      />
       <Card className='mt-15'>
         <Row>
           <Space style={{flexWrap: 'wrap'}}>
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
             <Switch checkedChildren="有数据" unCheckedChildren="无数据" checked={!!hasData} onChange={changeHasData}/>
           </Space>
         </Row>
         <Table className='mt-15'
           columns={columns}
           dataSource={hasData ? listData : []}
           loading={loading}
           size="middle"
           rowSelection
           scroll={{
             y: 600,
             x: 1200
           }}
         />
        
        <Drawer
        title={editType === 1 ? '新增账号': '编辑账号'} 
        placement="right"
        onClose={handleEditCancel}
        open={isModalOpen}
        maskClosable={false}
        width={'60%'}
        className='model'
        >
          <Form
          labelCol={{span: 3,}}
          onFinish={onFinish}
          >
          <Card title="账号信息">
            <Form.Item
              label="账号名称"
              name="nickName"
              wrapperCol={{span: 8,}}
              rules={[
                { required: true, message: 'Please input your nickName!' },
                // { maxlen: 10 , message: 'Please input correct phone number!', validateTrigger: 'onBlur' }
              ]}
            >
              <Input value={editData.user.name}/>
            </Form.Item>
            <Form.Item
              label="账号"
              name="number"
              wrapperCol={{span: 8,}}
              rules={[
                { required: true, message: 'Please input your number!' },
              ]}
            >
              <Input value={editData.user.account}/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              wrapperCol={{span: 8,}}
              rules={[
                // { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password value={editData.user.password} placeholder='不填则不改变'/>
            </Form.Item>
          </Card>
          <Card style={{marginTop: '16px'}} title="权限设置">
            <Row gutter={[16,16]}>
              {
                editData.authority.map((item,index) => {
                  return (
                    <Col span={24} key={item.id}>
                      <Space>
                        <Tag color="blue" className='switchTitle'>{item.text}</Tag>
                        {
                          item.checkList.map((child,cidx)=> {
                            return(
                              <Switch checkedChildren={child.value} unCheckedChildren={child.value} checked={child.checked} 
                              onChange={() => handleChangeAuth(index, cidx)}
                              key={child.id}
                              />
                            )
                          })
                        }
                      </Space>
                    </Col>
                  )
                })
              }
            </Row>
          </Card>
          <Form.Item wrapperCol={{offset: 19,span: 5,}} className='mt-15'>
            <Button type="primary" htmlType="submit" onClick={handleEditOk}>
              {editType === 1 ? '新增' : '保存'}
            </Button>
            <Button htmlType="button" onClick={handleEditCancel} style={{marginLeft: '15px'}}>
              取消
            </Button>
          </Form.Item>
          </Form>
        </Drawer>
          
        {/* 删除弹框 */}
        {contextHolder}
      </Card>
    </div>
    
  )
}

export default Account
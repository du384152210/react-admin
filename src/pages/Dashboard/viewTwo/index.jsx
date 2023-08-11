import React from 'react';
import './index.scss';
import { Row, Col, Card, Button, Statistic, Progress, Avatar, Image, Table, Tag, Badge } from 'antd';
import { UsergroupAddOutlined, ArrowUpOutlined, ArrowDownOutlined, CaretUpOutlined, 
  FileProtectOutlined, CaretDownOutlined, TransactionOutlined,DollarOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import avatar from '@/assets/images/avatar.gif';
import goodImg from '@/assets/images/logo-react.png';
import MixLineBar from '@/components/Echart/MixLineBar';

const formatter = (value) => <CountUp end={value} separator="," />
let userList = []
for(let i =0; i < 20; i++) {
  userList.push({id: i, avatar: avatar, name: '小阿三大', job: '高级成本会计师', percent: 60+i, change: 55,})
}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 60
  },
  {
    title: '下单用户',
    dataIndex: 'user',
    key: 'user',
    render: (text,record) => <>
      <Avatar src={text} alt="" />
    </>,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商品库存',
    dataIndex: 'stock',
    key: 'stock',
    render: (text) =>{
      if(text < 30) {
        return <Progress percent={text} status='exception'/>
      }else {
        return <Progress percent={text} status='success'/>
      }
    }
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
    key: 'amount',
    render: (text) => <span className='fw-b'>￥{text}</span>
  },
  {
    title: '商品图片',
    key: 'goodsImg',
    dataIndex: 'goodsImg',
    render: (_, { goodsImg }) => (
      <div className='flex'>
        {
          goodsImg.map((item,index) => <Image key={'img'+index} src={item} alt="" style={{width:'40px',marginRight: '10px'}}/>)
        }
      </div>
    ),
  },
  {
    title: '付款状态',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: (text) => 
      <Badge color={'blue'} dot>
        <span> {text}</span>
      </Badge>
  },
  {
    title: '客户标签',
    dataIndex: 'tag',
    key: 'tag',
    render: (text) => (
     <Tag color='blue'>{text}</Tag>
    ),
  },
  {
    title: '购买日期',
    dataIndex: 'date',
    key: 'date',
  },
];
let tableData = [];
for(let i=0; i< 20; i++) {
  tableData.push({key: i+1, id: i+1, user: avatar, goodsName: 'Good'+i, stock: 20+i, amount:298.00, 
    goodsImg: [goodImg, goodImg], paymentStatus: i%2===0? '已付款': '未付款', tag: i%2===0? '老用户': '新用户', date: '2022-09-19'
  })
}

export default function ViewTwo() {

  return (
    <Row gutter={[16,16]} className='viewTwo'>
      <Col span={6}>
        <Card size='small'>
          <div className='flex f-j-s f-a-c card-item-t'>
            <div className='flex f-a-c'>
              <div className='icon-circle icon-one'>
                <UsergroupAddOutlined />
              </div>
              <span className='item-txt'>本月注册人数</span>
            </div>
            <Button size="small" shape='round'>详情</Button>
          </div>
          <Statistic
            className='statistic'
            title="Active"
            value={1688}
            precision={2}
            formatter={formatter}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
          >
          </Statistic>
          <div className='flex f-a-c f-j-c card-item-b'>
            <CaretUpOutlined className='card-item-b-icon-up'/>
            <span className='card-item-b-num'>51%</span>
            <span className='card-item-b-txt'>已超过上周</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card size='small'>
          <div className='flex f-j-s f-a-c card-item-t'>
            <div className='flex f-a-c'>
              <div className='icon-circle icon-two'>
                <FileProtectOutlined />
              </div>
              <span className='item-txt'>本月订单总数</span>
            </div>
            <Button size="small" shape='round'>详情</Button>
          </div>
          <Statistic
            className='statistic'
            title="Active"
            value={2500}
            formatter={formatter}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowDownOutlined />}
          >
          </Statistic>
          <div className='flex f-a-c f-j-c card-item-b'>
            <CaretDownOutlined className='card-item-b-icon-down'/>
            <span className='card-item-b-num'>10%</span>
            <span className='card-item-b-txt'>已少于上周</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card size='small'>
          <div className='flex f-j-s f-a-c card-item-t'>
            <div className='flex f-a-c'>
              <div className='icon-circle icon-three'>
                <TransactionOutlined />
              </div>
              <span className='item-txt'>本周支付金额</span>
            </div>
            <Button size="small" shape='round'>详情</Button>
          </div>
          <Statistic
            className='statistic'
            title="Active"
            value={3980}
            precision={2}
            formatter={formatter}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix= '￥'
          >
          </Statistic>
          <div className='flex f-a-c f-j-c card-item-b'>
            <CaretUpOutlined className='card-item-b-icon-up'/>
            <span className='card-item-b-num'>51%</span>
            <span className='card-item-b-txt'>已超过上周</span>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card size='small'>
          <div className='flex f-j-s f-a-c card-item-t'>
            <div className='flex f-a-c'>
              <div className='icon-circle icon-four'>
              <DollarOutlined />
              </div>
              <span className='item-txt'>本月销售总额</span>
            </div>
            <Button size="small" shape='round'>详情</Button>
          </div>
          <Statistic
            className='statistic'
            title="Active"
            value={16999}
            precision={2}
            formatter={formatter}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix= '￥'
          >
          </Statistic>
          <div className='flex f-a-c f-j-c card-item-b'>
            <CaretUpOutlined className='card-item-b-icon-up'/>
            <span className='card-item-b-num'>51%</span>
            <span className='card-item-b-txt'>已超过上周</span>
          </div>
        </Card>
      </Col>
      <Col span={14}>
        <Card size='small' title="订单统计">
          <MixLineBar  style={{width:'100%', minHeight: '400px'}}/>
        </Card>
      </Col>
      <Col span={10}>
        <Card size='small' title="用户分析">
          <ul className='n-list'>
            {
              userList.map(item => <li className='n-list-item' key={item.id}>
                <div className='n-list-item_prefix'>
                  <img src={item.avatar} alt="" className='n-avatar'/>
                </div>
                <div className='n-list-item_main flex1'>
                  <div>{item.name}</div>
                  <div className='flex f-a-c f-j-s  flex1'>
                    <span className='c-9'>{item.job}</span>
                    <div className='flex flex1 ' style={{marginLeft: '15px', justifyContent: 'flex-end'}}>
                      <div style={{width:'70%', marginRight: '15px'}} className='flex f-a-c '>
                        <Progress
                          percent={item.percent}
                          strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                        />
                        <div className='flex f-a-c' style={{marginLeft: '15px'}}>
                          <CaretUpOutlined className='c-primary'/>
                          <span className='fw-b'>{item.change}%</span>
                        </div>
                      </div>
                      <Button shape='round' type="primary" ghost size='small'>查看</Button>
                    </div>
                  </div>
                </div>
              </li>)
            }
          </ul>
        </Card>
      </Col>
      <Col span={16}>
        <Card title='最新订单' size='small' >
          <Table columns={columns} dataSource={tableData} scroll={{y:400}} ellipsis='true' size="middle"/>
        </Card>
      </Col>
      <Col span={8} >
        <Card title="消费排行" size="small"></Card>
      </Col>
    </Row>
  )
}

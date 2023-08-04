import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { Card, Row, Col, List, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Map from '@/components/Map'
import Pie from '@/components/Pie'
import LineBar from '@/components/LineBar'
import './index.scss'

const mapList = [{"name":"北京","value":2000},{"name":"福建","value":4000}]
const navList = [
  { id: 1, url: '/account', text: '账号列表', icon: <UserOutlined className='icon_img' /> },
  { id: 2, url: '/account', text: '账号列表', icon: <UserOutlined className='icon_img' /> },
  { id: 3, url: '/account', text: '用户管理', icon: <UserOutlined className='icon_img' /> },
  { id: 4, url: '/account', text: '用户管理', icon: <UserOutlined className='icon_img' /> },
  { id: 5, url: '/account', text: '用户管理', icon: <UserOutlined className='icon_img' /> },
  { id: 6, url: '/account', text: '用户管理', icon: <UserOutlined className='icon_img' /> },
  { id: 7, url: '/account', text: '用户管理', icon: <UserOutlined className='icon_img' /> },
  { id: 8, url: '/account', text: '用户管理', icon: <UserOutlined className='icon_img' /> },
]
const dataList = [
  { id: 1, url: '', text: '用户总数', number: 36 },
  { id: 2, url: '', text: '用户总数', number: 0 },
  { id: 3, url: '', text: '用户总数', number: 36 },
  { id: 4, url: '', text: '用户总数', number: 0 },
  { id: 5, url: '', text: '用户总数', number: 0 },
  { id: 6, url: '', text: '用户总数', number: 36 },
]
const orderList = [
  { id: 1, url: '', text: '全部订单', number: 12 },
  { id: 2, url: '', text: '全部订单', number: 0 },
  { id: 3, url: '', text: '全部订单', number: 12 },
  { id: 4, url: '', text: '全部订单', number: 0 },
  { id: 5, url: '', text: '全部订单', number: 12 },
]
const tabList = [
  {
    key: '1',
    tab: '订单量',
  },
  {
    key: '2',
    tab: '用户数',
  },
]
const lineDate = [
  { id:1, text:'近7天'},
  { id:2, text:'近一个月'},
  { id:3, text:'近一年' },
]
const ldata = {
  0 : {
    title: '近7天订单趋势',
    x: ["周一", "周二","周三","周四","周五","周六","周日"],
    y: [1,2,3,4,5,6,7]
  },
  1: {
    title: '近一个月订单趋势',
    x: [ "06-04",
    "06-05",
    "06-06",
    "06-07",
    "06-08",
    "06-09",
    "06-10",
    "06-11",
    "06-12",
    "06-13",
    "06-14",
    "06-15",
    "06-16",
    "06-17",
    "06-18",
    "06-19",
    "06-20",
    "06-21",
    "06-22",
    "06-23",
    "06-24",
    "06-25",
    "06-26",
    "06-27",
    "06-28",
    "06-29",
    "06-30",
    "07-01",
    "07-02",
    "07-03"],
    y: [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,3,0,0,0,0]
  },
  2: {
    title: '近一年订单趋势',
    x: ["八月", "九月", "十月", "十一月", "十二月", "一月", "二月", "三月", "四月", "五月", "六月", "七月"],
    y: [0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0]
  }
}
const pieData = [
  {name: '普通用户', value: 100},
  {name: '一级用户', value: 10},
  {name: '二级用户', value: 20},
  {name: '三级用户', value: 30},
  {name: '四级用户', value: 15},
  {name: '五级级用户', value: 25},
]
const ListData = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

 function ViewPart() {
  const [barIdx, setbarIdx] = useState(0)
  const [bartabKey, setbartabKey] = useState('1')
  const [lineData, setlineData] = useState(ldata[barIdx])

  const changebarNav = (index) => {
    setbarIdx(index)
    setlineData(ldata[index])
    console.log(lineData);
  }
  const changebarTab = (key) => {
    setbartabKey(key)
  }

  return (
    <div>
      <Row gutter={[16,16]}>
        <Col span={8}>
          <Card title="快捷入口" size="small">
            <Row gutter={[16, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
              {
                navList.map(item => {
                  return (
                    <Col span={6} key={item.id}>
                      <Link to={item.url}>
                        <Card.Grid className='icon_item'>
                          {item.icon}
                          <p className='icon_text'>{item.text}</p>
                        </Card.Grid>
                      </Link>
                    </Col>
                  )
                })
              }
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="数据统计" size="small">
            <Row gutter={[16, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
              {
                dataList.map(item => {
                  return (
                    <Col span={8} key={item.id}>
                      <Link>
                        <Card.Grid className='number_item bg-primary'>
                          <p className=''>{item.text}</p>
                          <p className='number c-primary'>{item.number}</p>
                        </Card.Grid>
                      </Link>
                    </Col>
                  )
                })
              }
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="订单统计" size="small">
            <Row gutter={[16, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
              {
                orderList.map(item => {
                  return (
                    <Col span={8} key={item.id}>
                      <Link>
                        <Card.Grid className='number_item bg-warning'>
                          <p className=''>{item.text}</p>
                          <p className='number c-warning'>{item.number}</p>
                        </Card.Grid>
                      </Link>
                    </Col>
                  )
                })
              }
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card 
          tabList={tabList}
          activeTabKey={bartabKey}
          onTabChange={changebarTab}
          tabBarExtraContent={
            <div>
              {
                lineDate.map((item,index) => {
                  return <span key={item.id} className={['barNav_item', barIdx === index ? 'c-error':null].join(' ')} onClick={()=>changebarNav(index)}>{item.text}</span>
                })
              }
            </div>
          } 
          size="small" style={{overflow:'hidden', width: '100%'}}>
              <LineBar data={lineData} style={{width:'100%', minHeight: '400px'}}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="排行" style={{overflow:'hidden', width: '100%'}}>
          <List
            dataSource={ListData}
            style={{minHeight: '400px'}}
            renderItem={(item,index) => {
              let icon = '';
              switch (index) {
                case 0:
                  icon = <Badge count={index +1} color='#ff4d4f'/>
                  break;
                case 1:
                  icon = <Badge count={index +1} color='#faad14'/>
                  break;
                case 2:
                  icon = <Badge count={index +1} color='#3ba0e9'/>
                  break;
                default:
                  icon = <Badge count={index +1} color='#dddddd'/>
                  break;
              }
              return (
                <List.Item style={{justifyContent: 'flex-start'}}>
                  {icon}
                  <span style={{marginLeft: '10px'}}>{item}</span>
                </List.Item>
              )
            }
            // (
            //   <List.Item>
            //       if(index ===0) {
            //         <Badge count={index +1} color='#ff4d4f'/>
            //       }else if(index === 1) {
            //         <Badge count={index +1} color='#faad14'/>
            //       }else if(index === 2) {
            //         <Badge count={index +1} color='#3ba0e9'/>
            //       }else {
            //         <Badge count={index +1} color='#dddddd'/>
            //       }
                  
                
            //     {item}
            //   </List.Item>
            // )
          }
          />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="全国用户分布" style={{overflow:'hidden', width: '100%'}}>
              <Map data={mapList} style={{width:'100%', minHeight: '400px'}}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="用户统计" style={{overflow:'hidden', width: '100%'}}>
              <Pie data={pieData} style={{width:'100%', minHeight: '400px'}}/>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ViewPart
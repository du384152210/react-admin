import React from 'react';
import './index.scss';
import { Row, Col, Card, Button, Statistic } from 'antd';
import { UsergroupAddOutlined, ArrowUpOutlined, ArrowDownOutlined, CaretUpOutlined, 
  FileProtectOutlined, CaretDownOutlined, TransactionOutlined,DollarOutlined } from '@ant-design/icons'

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
            precision={2}
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
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix= '￥'
          >
          </Statistic>
          <div className='flex f-a-c f-j-c card-item-b'>
            <CaretUpOutlined className='card-item-b-icon'/>
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
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix= '￥'
          >
          </Statistic>
          <div className='flex f-a-c f-j-c card-item-b'>
            <CaretUpOutlined className='card-item-b-icon'/>
            <span className='card-item-b-num'>51%</span>
            <span className='card-item-b-txt'>已超过上周</span>
          </div>
        </Card>
      </Col>
      <Col span={12}>
        <Card size='small'></Card>
      </Col>
      <Col span={12}>
        <Card size='small'></Card>
      </Col>
    </Row>
  )
}

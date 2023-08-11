import React, { useState } from 'react';
import { Modal, Input, Divider, Empty } from 'antd';
import * as Icons from "@ant-design/icons";
import './index.scss';


export default function SelectIcon(props) {
  const { show } = props;
  const [iconsList, setIconList] = useState(Icons);


  const onInput = (e) => {
    setIconList(filter(e.target.value))
  }
  const handleSelIcon = (key) => {
    props.onClose(key)
  }
  const onclose = () => {
    props.onClose()
  }

  const filter = (val) => {
    if(!val) return Icons;
    let result = {};
    for(const key in Icons) {
      if(key.toLowerCase().indexOf(val.toLowerCase()) > -1) result[key] = Icons[key];
    }
    return result;
  }
  
  return (
    <Modal title="请选择图标" open={show} width={'65%'} footer={null} onCancel={onclose}>
      <Input prefix={React.createElement(Icons['SearchOutlined'])} onInput={onInput}/>
      <div className='iconScroll'>
          {
            Object.keys(iconsList).length === 0 ? 
            <Empty /> : 
            <>
              <Divider>线框风格</Divider>
          <div className='flex f-a-c f-wrap'>
            {
              Object.keys(iconsList).map((key) => {
                if (key.includes('Outlined')) {
                    let Com = Icons[key]
                    return (
                      <div className='icon-item' onClick={() => handleSelIcon(key)} key={key}>
                        <Com style={{fontSize: '36px'}} className="icon-svg"></Com>
                        <span className='icon-name'>{key}</span>
                      </div>
                    )
                }
                return <></>
              })
            }
          </div>
          <Divider>实底风格</Divider>
          <div className='flex f-a-c f-wrap'>
            {
              Object.keys(iconsList).map((key) => {
                if (key.includes('Filled')) {
                    let Com = Icons[key]
                    return (
                      <div className='icon-item' onClick={() => handleSelIcon(key)} key={key}>
                        <Com style={{fontSize: '36px'}} className="icon-svg"></Com>
                        <span className='icon-name'>{key}</span>
                      </div>
                    )
                }
                return <></>
              })
            }
          </div>
          <Divider>圆形实底风格</Divider>
          <div className='flex f-a-c f-wrap'>
            {
              Object.keys(iconsList).map((key) => {
                if (key.includes('CircleFilled')) {
                    let Com = Icons[key]
                    return (
                      <div className='icon-item' onClick={() => handleSelIcon(key)} key={key}>
                        <Com style={{fontSize: '36px'}} className="icon-svg"></Com>
                        <span className='icon-name'>{key}</span>
                      </div>
                    )
                }
                return <></>
              })
            }
          </div>
          <Divider>双色风格</Divider>
          <div className='flex f-a-c f-wrap'>
            {
              Object.keys(iconsList).map((key) => {
                if (key.includes('TwoTone') && !key.includes('Color')) {
                    let Com = Icons[key]
                    return (
                      <div className='icon-item' onClick={() => handleSelIcon(key)} key={key}>
                        <Com style={{fontSize: '36px'}} className="icon-svg"></Com>
                        <span className='icon-name'>{key}</span>
                      </div>
                    )
                }
                return <></>
              })
            }
          </div>
            </>
          }
      </div>
    </Modal>
  )
}

import React from 'react';
import { Badge } from 'antd';
import './index.scss'

export default function Message() {
  return (
    <div className='message'>
      <Badge count={5}>
      <i className="iconfont icon-xiaoxi toolBar-icon"></i>
      </Badge>
    </div>
  )
}

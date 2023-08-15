import React from 'react';
import { Dropdown,Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalState } from '@/store/modules/global';
import { MergeCellsOutlined } from '@ant-design/icons';


export default function CardControl() {
  const cardSize = useSelector((state) => state.global.cardSize);
  const dispatch = useDispatch();

  const sizelist = [
    {key: 'default', label: '默认'},
    {key: 'small', label: '小型'},
  ]
  const changeCardSize = (val) => {
    dispatch(setGlobalState(['cardSize', val]))
  }
  function initItems (list) {
    return list.map((item,index) => {
      return {
        key: index,
        label: (
          <div className='dropItem' key={item.key} onClick={()=> changeCardSize(item.key)}>
            {item.label}
          </div>
        ),
        disabled: cardSize === item.key
      }
    })
  }
  return (
    
      <Dropdown 
        menu={{items:initItems(sizelist)}}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <Tooltip placement="rightTop" title='卡片大小'>
          <MergeCellsOutlined style={{fontSize: '21px'}}/>
        </Tooltip>
        
      </Dropdown>
    
  )
}

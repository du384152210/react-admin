import React from 'react';
import { Dropdown,Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalState } from '@/store/modules/global';
import { SplitCellsOutlined } from '@ant-design/icons';


export default function TableControl() {
  const tableSize = useSelector((state) => state.global.tableSize);
  const dispatch = useDispatch();

  const sizelist = [
    {key: 'small', label: '小型'},
    {key: 'middle', label: '默认'},
    {key: 'large', label: '大型'},
  ]
  const changeCardSize = (val) => {
    dispatch(setGlobalState(['tableSize', val]))
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
        disabled: tableSize === item.key
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
        <Tooltip placement="rightTop" title='表格大小'>
          <SplitCellsOutlined style={{fontSize: '21px'}}/>
        </Tooltip>
        
      </Dropdown>
    
  )
}

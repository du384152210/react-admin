import React from 'react';
import { Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalState } from '@/store/modules/global';


export default function Language() {
  const language = useSelector((state) => state.global.language);
  const dispatch = useDispatch();
  const languageList = [
    { label: "简体中文", value: "zhCN" },
    { label: "English", value: "enUS" }
  ];
  const changeLanguage = (val) => {
    dispatch(setGlobalState(['language', val]))
  }
  function initItems (list) {
    return list.map((item,index) => {
      return {
        key: index,
        label: (
          <div className='dropItem' key={item.value} onClick={()=> changeLanguage(item.value)}>
            {item.label}
          </div>
        ),
        disabled: language === item.value
      }
    })
  }
  return (
    <div>
      <Dropdown 
        menu={{items:initItems(languageList)}}
        placement="bottomRight"
        arrow
        trigger={['click']}
      >
        <i className="iconfont icon-zhongyingwen toolBar-icon"></i>
      </Dropdown>
    </div>
  )
}

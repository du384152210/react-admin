import React from 'react';
import './index.scss';
import Language from '../components/Language';
import Avatar from '../components/Avatar';
import ThemeSetting from '../components/ThemeSetting';
import Message from '../components/Message';
import CardControl from '../components/CardControl';
import TableControl from '../components/TableControl';

export default function ToolBarRight() {
  return (
    <div className='tool-bar-ri'>
      <div className='header-icon'>
        <TableControl id="tableControl"/>
        <CardControl id="cardControl" />
        <Language id="language"/>
        <ThemeSetting id="themeSetting"/>
        <Message id="message" />
      </div>
      <span className='username'>管理员</span>
      <Avatar/>
    </div>
  )
}

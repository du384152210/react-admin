import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';

export default function Main() {
  return (
    <div className='contentStyle'>
      <Outlet/>
    </div>
  )
}

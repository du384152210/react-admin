import React from 'react';
import './index.scss';
import bg from '@/assets/images/welcome.png';

export default function Home() {
  return (
    <div className='flex f-a-c f-j-c home-bg'>
      <img src={bg} alt=''/>
    </div>
  )
}

import React, {useState} from 'react';
import SelectIcon  from '@/components/SelectIcon';
import { Input,Card } from 'antd';

const { Search } = Input;
export default function SlectIconPage() {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState('')
  const showSelectIcon = (key) => {
    setShow(true)
  }
  const handleClose = (key) => {
    setShow(false)
    if(key) setIcon(key)
  } 
  return (
    <div style={{height: '100%' }}>
      <Card style={{height: '100%' }}>
        <h1 className='t-c' style={{color: '#000',fontSize: '30px'}}>图标选择🍓🍇🍈🍉</h1>
        <Search placeholder='搜索图标' onClick={showSelectIcon} value={icon}/>
      </Card>
      
      <SelectIcon show={show} close={handleClose}/>
    </div>
    

  )
}

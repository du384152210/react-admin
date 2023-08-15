import React, {useState} from 'react';
import SelectIcon  from '@/components/SelectIcon';
import { Input,Card } from 'antd';
import { useSelector } from 'react-redux';

const { Search } = Input;
export default function SlectIconPage() {
  const {cardSize} = useSelector((state) => state.global);
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState('')
  const showSelectIcon = (key) => {
    setShow(true)
  }
  const handleClose = (iconName) => {
    setShow(false)
    if(iconName) setIcon(iconName)
  } 
  return (
    <div style={{height: '100%' }}>
      <Card style={{height: '100%' }} size={cardSize}>
        <h1 className='t-c' style={{color: '#000',fontSize: '30px'}}>图标选择🍓🍇🍈🍉</h1>
        <Search placeholder='搜索图标' onClick={showSelectIcon} value={icon}/>
        <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
          <table className='ant-descriptions_table'>
            <tbody>
              <tr>
                <td className='ant-descriptions_label ant-descriptions_cell'>show</td>
                <td className='ant-descriptions_cell ant-descriptions_content'>控制组件显示/隐藏</td>
              </tr>
              <tr>
                <td className='ant-descriptions_label ant-descriptions_cell'>onClose</td>
                <td className='ant-descriptions_cell ant-descriptions_content'>[事件]选择完毕或关闭回调 function(iconName)</td>
              </tr>
            </tbody>
          </table>
      </Card>
      <SelectIcon show={show} onClose={handleClose}/>
    </div>
    

  )
}

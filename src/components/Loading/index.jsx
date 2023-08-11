import { Spin } from 'antd';
import './index.scss';

function Loading() {
  return (
    <div className='loadingStyle'>
      <Spin size="large" className='spin'>
        
      </Spin>
    </div>
  )
}
export default Loading
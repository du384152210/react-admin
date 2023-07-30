import { Spin } from 'antd'

const loadingStyle = {
  height: '100%',
  width: '100%',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
}
const logo = {
  margin: '35% auto 0'
}
function Loading() {
  return (
    <div style={loadingStyle}>
      <Spin size="large" style={logo} tip="Loading">
        <div className="content" />
      </Spin>
    </div>
  )
}
export default Loading
import Router from './routes';
import './App.css';
import { ConfigProvider, } from 'antd';
import { useSelector } from 'react-redux';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';

function App() {
  const color = useSelector((state) => state.global.primary)
  const language = useSelector((state) => state.global.language)
  const languageObj = {
    'zhCN': zhCN,
    'enUS': enUS
  }
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: color,
      },
    }}
    locale={languageObj[language]}
    >
      <Router/>
    </ConfigProvider>
  )
}

export default App;

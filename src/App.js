import Router from './routes';
import './App.css';
import { ConfigProvider, } from 'antd';
import { useSelector } from 'react-redux';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import ThemeDrawer from '@/layouts/components/ThemeDrawer';

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
      <ThemeDrawer />
    </ConfigProvider>
  )
}

export default App;

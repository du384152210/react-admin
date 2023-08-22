import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import "@/assets/iconfont/iconfont.scss";
import App from './App';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { message } from 'antd';
// store持久化
import { PersistGate } from 'redux-persist/integration/react';

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate >
    </Provider>
  </BrowserRouter>
);



import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalReducer from './modules/global'; // 全局redux
import authReducer from './modules/auth'; // 权限redux


// 定义持久化配置 
const persistConfig = { key: 'root', storage, };

// 创建持久化reducer 
const persistedReducer = persistReducer(persistConfig, globalReducer);

const store = configureStore({
  reducer: {
    global: persistedReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

 // 创建持久化存储器 
 const persistor = persistStore(store); 

export {store, persistor}
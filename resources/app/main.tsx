import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { ConfigProvider } from 'antd';

import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{
        components: {
            Layout: {
                colorBgHeader: '#151515'
            }
        }
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

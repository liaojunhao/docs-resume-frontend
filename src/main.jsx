import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HappyProvider } from '@ant-design/happy-work-theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HappyProvider>
      <App />
    </HappyProvider>
  </React.StrictMode>
);

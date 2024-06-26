import React from 'react';
import ReactDOM from 'react-dom/client';
import Editor from './components/Editor';
import './index.css';
import { HappyProvider } from '@ant-design/happy-work-theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HappyProvider>
      <Editor />
    </HappyProvider>
  </React.StrictMode>
);

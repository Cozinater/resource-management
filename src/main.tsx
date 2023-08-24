import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import 'primeicons/primeicons.css'; // icons
import ContextWrapper from './context/contextWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>
);

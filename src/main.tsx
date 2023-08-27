import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import ContextWrapper from './context/contextWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </QueryClientProvider>
  </React.StrictMode>
);

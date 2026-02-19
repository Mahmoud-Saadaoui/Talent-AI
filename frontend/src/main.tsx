import React from 'react';
import { createRoot } from 'react-dom/client'
import './app/index.css'
import './i18n/config'
import Router from './app/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {     
      gcTime: 60 * 20 * 1000,  
      retry: 2,                   
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <AppProvider> */}
        <Router />
      {/* </AppProvider> */}
    </QueryClientProvider>
  </React.StrictMode>,
)

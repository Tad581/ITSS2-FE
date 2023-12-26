import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers';
import { AuthContextProvider } from './context/authContext';
import { ChatContextProvider } from './context/chatContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/AuthContext.tsx'
import ApiContextProvider from './Context/ApiContext.tsx'
import { ToastContextProvider } from './Context/ToastContext.tsx'
import UserInfoContextProvider from './Context/UserInfoContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiContextProvider>
      <AuthContextProvider>
        <UserInfoContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
        </UserInfoContextProvider>
      </AuthContextProvider>
    </ApiContextProvider>
  </React.StrictMode>
)

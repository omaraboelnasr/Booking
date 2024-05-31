import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/AuthContext.tsx'
import ApiContextProvider from './Context/ApiContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
      <App />
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

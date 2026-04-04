import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import AuthProvider from './context/AuthContext.jsx'
import { LayoutGroup } from "framer-motion";

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
    <Provider store={store}>
    <AuthProvider>
    <LayoutGroup>
      <App />
    </LayoutGroup>  
    </AuthProvider>
    </Provider>
  </StrictMode>,
)

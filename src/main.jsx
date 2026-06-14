import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n' // આ નવી લાઈન તમારે ઉમેરવાની છે

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
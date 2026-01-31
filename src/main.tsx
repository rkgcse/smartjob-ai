import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './src/pages/Adminlogin.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

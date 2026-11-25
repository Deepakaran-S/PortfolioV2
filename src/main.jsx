import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log(
  "%cHey, fellow developer 👋",
  "font-size:14px;font-weight:700;color:#84cc16"
);
console.log("Curious how this is built? Say hi via the contact section.");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

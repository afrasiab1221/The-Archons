import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ensureLenis } from './hooks/useLenis.js'
import './styles/global.css'

// Initialize Lenis immediately so its scrollerProxy is in place before
// any component creates a ScrollTrigger.
ensureLenis()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

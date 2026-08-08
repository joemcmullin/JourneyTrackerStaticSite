import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { isStatic } from './components/motion'

// Static mode (?static=1 / reduced motion QA): fixed-height hero + instant
// scrolling so full-page headless captures reflect real proportions.
if (isStatic()) document.documentElement.classList.add('static-mode')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

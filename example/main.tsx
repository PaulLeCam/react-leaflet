import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.js'
import './index.css'

// biome-ignore lint/style/noNonNullAssertion: DOM root exists
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

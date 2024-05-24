import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'

// biome-ignore lint/style/noNonNullAssertion: DOM root exists
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
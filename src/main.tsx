import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/big-shoulders-display/500'
import '@fontsource/big-shoulders-display/800'
import '@fontsource/big-shoulders-display/900'
import '@fontsource/instrument-serif/400'
import '@fontsource/instrument-serif/400-italic'
import '@fontsource-variable/geist'
import './index.css'
import './shop/shop.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW();
}

// Enable fast refresh
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Create root with type assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Report web vitals
onCLS(console.log);
onFID(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);
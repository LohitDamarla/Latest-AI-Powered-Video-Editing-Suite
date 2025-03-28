import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // This is still crucial!
import App from './App.jsx'; // Your actual App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
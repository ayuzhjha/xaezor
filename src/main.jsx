import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppPhaseProvider } from './context/AppPhaseContext';
import App from './App';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppPhaseProvider>
      <App />
    </AppPhaseProvider>
  </StrictMode>
);

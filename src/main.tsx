import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing application root');

const app = <StrictMode><App /></StrictMode>;
if (rootElement.dataset.prerendered === 'true') {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

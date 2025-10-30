import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Disable React Error Overlay completely
if (process.env.NODE_ENV === 'development') {
  const noop = () => {};
  window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ = {
    iframeRef: { current: null },
    handleRuntimeError: noop,
    handleCompileError: noop,
  };
}

// Suppress all errors globally before React loads
window.addEventListener('error', (event) => {
  const errorMessage = event.message?.toString() || '';
  const errorString = event.error?.toString() || '';
  
  // Suppress permission errors and object errors
  if (errorMessage.includes('PERMISSION_DENIED') || 
      errorString.includes('PERMISSION_DENIED') ||
      errorMessage.includes('[object Object]') ||
      errorString.includes('[object Object]')) {
    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const reasonString = typeof reason === 'object' ? JSON.stringify(reason) : String(reason);
  
  // Suppress permission errors
  if (reasonString.includes('PERMISSION_DENIED')) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

// Override console.error to suppress errors
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    }
    return String(arg);
  }).join(' ');
  
  if (message.includes('PERMISSION_DENIED') || message.includes('[object Object]')) {
    return;
  }
  originalError.apply(console, args);
};

console.warn = (...args: any[]) => {
  const message = args.map(arg => String(arg)).join(' ');
  if (message.includes('PERMISSION_DENIED')) {
    return;
  }
  originalWarn.apply(console, args);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

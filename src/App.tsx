// src/App.tsx
import React, { useState, useEffect } from 'react';
import {
  BasedMiniAppProvider,
  useMiniApp,
} from '@basedone/miniapp-sdk/react';
import './App.css';
import { TradingConfigForm } from './components/TradingConfigForm';
import { TradingDashboard } from './components/TradingDashboard';
import { ControlPanel } from './components/ControlPanel';
// Logger removed for production
import { TradingConfig } from './types';
import { tradingOrchestrator } from './services/TradingOrchestrator';

function TradingBot() {
  let connected = false;
  let connecting = false;
  
  try {
    const miniApp = useMiniApp();
    connected = miniApp.connected;
    connecting = miniApp.connecting;
  } catch (error) {
    // Silently ignore SDK errors
    console.log('MiniApp SDK not available, using standalone mode');
  }
  const [config, setConfig] = useState<TradingConfig | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState(tradingOrchestrator.getState());


  // Connection status logging removed for production

  // Update state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setState(tradingOrchestrator.getState());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConfigSubmit = async (newConfig: TradingConfig) => {
    setConfig(newConfig);
    try {

      await tradingOrchestrator.start(newConfig);
      setIsRunning(true);

    } catch (error) {
      alert('Failed to start trading: ' + error);
    }
  };

  const handleStop = async () => {
    try {
      await tradingOrchestrator.stop();
      setIsRunning(false);
    } catch (error) {
    }
  };

  const handleStart = async () => {
    if (!config) {
      alert('Please configure trading settings first');
      return;
    }
    try {
      await tradingOrchestrator.start(config);
      setIsRunning(true);
    } catch (error) {
      alert('Failed to start trading: ' + error);
    }
  };

  if (!connected) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2>🤖 Martingale Trading Bot</h2>
        <p>Status: {connecting ? 'Connecting...' : 'Ready'}</p>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f0f9ff',
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <h3 style={{ marginTop: 0 }}>📋 Setup Instructions</h3>
          <ol style={{ paddingLeft: '20px' }}>
            <li>Visit <a href="https://testnet.based.one" target="_blank" rel="noopener noreferrer">testnet.based.one</a></li>
            <li>Click the bug icon on the lower right corner</li>
            <li>Enter App ID: <code style={{ background: '#e0e0e0', padding: '2px 6px', borderRadius: '3px' }}>martingale01</code></li>
            <li>Enter URL: <code style={{ background: '#e0e0e0', padding: '2px 6px', borderRadius: '3px' }}>http://localhost:3000</code></li>
            <li>Click "Load app"</li>
          </ol>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#fff3cd',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          ⚠️ This app must be opened through Based.One testnet to function properly
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: '#0d0d0d',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <h1 style={{
        color: '#fff',
        fontSize: '32px',
        marginBottom: '10px',
        fontWeight: 'bold'
      }}>
        🤖 Martingale Trading Bot
      </h1>

      {/* Connection Status */}
      <div style={{
        background: 'linear-gradient(135deg, #1a4d2e 0%, #2d5f3f 100%)',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #22c55e',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '20px' }}>✅</span>
        <span style={{ color: '#a7f3d0', fontWeight: '500' }}>Connected to Based.One terminal</span>
      </div>

      {/* Control Panel */}
      <div style={{ marginBottom: '20px' }}>
        <ControlPanel
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
        />
      </div>

      {/* Configuration Form */}
      {!isRunning && (
        <div style={{ marginBottom: '20px' }}>
          <TradingConfigForm
            onSubmit={handleConfigSubmit}
            disabled={isRunning}
          />
        </div>
      )}

      {/* Dashboard */}
      {isRunning && (
        <TradingDashboard
          positions={state.positions}
          gridOrders={state.gridOrders}
          takeProfitOrder={state.takeProfitOrder}
          currentPrice={state.positions[0]?.currentPrice || 0}
          totalPnL={state.totalPnL}
          averageEntry={state.averageEntry}
        />
      )}

      {/* Info Section */}
      <div style={{
        marginTop: '30px',
        padding: '24px',
        background: '#1a1a1a',
        borderRadius: '12px',
        fontSize: '14px',
        border: '1px solid #333'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>ℹ️</span> How it works
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#999', lineHeight: '1.8', textAlign: 'left' }}>
          <li>Configure your trading parameters (coin, leverage, price range, grid count)</li>
          <li>The bot will place grid orders within your specified price range</li>
          <li>When orders are filled, positions are opened and tracked</li>
          <li>A take profit order is automatically placed based on your target percentage</li>
          <li>When take profit is hit, the grid resets from the current price</li>
        </ul>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Don't show error UI, just log it
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Ignore permission errors and object errors from Based App SDK
    const errorMessage = error?.message?.toString() || '';
    const errorString = error?.toString() || '';

    if (errorMessage.includes('PERMISSION_DENIED') ||
      errorString.includes('PERMISSION_DENIED') ||
      errorMessage.includes('[object Object]') ||
      errorString.includes('[object Object]')) {
      // Silently ignore these errors
      this.setState({ hasError: false });
      return;
    }

    // Log other errors but don't show error UI
    console.log('Error caught by boundary (suppressed):', error);
    this.setState({ hasError: false });
  }

  render() {
    return this.props.children;
  }
}

function App() {
  const [hasProvider, setHasProvider] = useState(true);

  // Suppress permission errors globally
  useEffect(() => {
    // Suppress console errors
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || '';
      if (message.includes('PERMISSION_DENIED') || message.includes('[object Object]')) {
        return;
      }
      originalError.apply(console, args);
    };

    // Suppress window errors - most aggressive approach
    const errorHandler = (event: ErrorEvent) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    };

    window.addEventListener('error', errorHandler, true);

    // Suppress unhandled promise rejections
    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.stopImmediatePropagation();
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', rejectionHandler, true);

    return () => {
      console.error = originalError;
      window.removeEventListener('error', errorHandler, true);
      window.removeEventListener('unhandledrejection', rejectionHandler, true);
    };
  }, []);

  // Try to render with provider, fallback to standalone
  try {
    return (
      <ErrorBoundary>
        <BasedMiniAppProvider config={{
          appId: 'martingale01',
          name: 'Martingale Trading Bot',
          url: 'http://localhost:3000',
          autoConnect: false
        }}>
          <div className="App">
            <TradingBot />
          </div>
        </BasedMiniAppProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    // If provider fails, render without it
    return (
      <ErrorBoundary>
        <div className="App">
          <TradingBot />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

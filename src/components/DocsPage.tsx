import React from 'react';

export const DocsPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1000px', 
      margin: '0 auto',
      background: '#0d0d0d',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img 
          src="/martingale-bot-icon.png" 
          alt="Martingale Trading Bot" 
          style={{ width: '200px', height: '200px', marginBottom: '20px' }}
        />
        <h1 style={{ fontSize: '48px', margin: '0 0 20px 0', color: '#fff' }}>
          🤖 Martingale Trading Bot
        </h1>
        <p style={{ fontSize: '20px', color: '#999', margin: 0 }}>
          An automated grid trading bot for Based using martingale strategy with intelligent position management and automatic take-profit execution.
        </p>
      </div>

      {/* Features */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#3b82f6', marginBottom: '20px' }}>✨ Features</h2>
        <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#ccc' }}>
          <li><strong>Grid Trading Strategy</strong>: Automatically places grid orders within specified price ranges</li>
          <li><strong>Long/Short Support</strong>: Choose between long or short positions based on market conditions</li>
          <li><strong>Automatic Take Profit</strong>: Automatically closes positions when target profit percentage is reached</li>
          <li><strong>Grid Reset</strong>: Automatically creates new grids from current price after take-profit execution</li>
          <li><strong>Real-time Monitoring</strong>: Live tracking of positions, orders, and P&L</li>
          <li><strong>Dark Theme UI</strong>: Modern, professional interface optimized for trading</li>
          <li><strong>Configurable Parameters</strong>: Customize coin, leverage, price range, grid count, and more</li>
        </ul>
      </section>

      {/* Getting Started */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#22c55e', marginBottom: '20px' }}>🚀 Getting Started</h2>
        
        <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>Running on Based.One</h3>
        <ol style={{ fontSize: '16px', lineHeight: '1.8', color: '#ccc' }}>
          <li>Visit <a href="https://testnet.based.one" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>https://testnet.based.one</a></li>
          <li>Click the bug icon in the lower right corner</li>
          <li>Enter App ID: <code style={{ background: '#333', padding: '2px 6px', borderRadius: '3px' }}>martingale01</code></li>
          <li>Enter URL: <code style={{ background: '#333', padding: '2px 6px', borderRadius: '3px' }}>http://localhost:3000</code></li>
          <li>Click "Load app"</li>
        </ol>
      </section>

      {/* How to Use */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#f59e0b', marginBottom: '20px' }}>📖 How to Use</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '15px' }}>1. Trading Configuration</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc' }}>
              <li><strong>Coin Selection</strong>: Choose from BTC, ETH, SOL, MATIC, AVAX</li>
              <li><strong>Leverage</strong>: Set leverage from 1x to 100x</li>
              <li><strong>Price Range</strong>: Define From Price and To Price for grid placement</li>
              <li><strong>Grid Count</strong>: Set number of grid levels (2-50)</li>
              <li><strong>Strategy</strong>: Choose Long (buy) or Short (sell) strategy</li>
              <li><strong>Seed Amount</strong>: Set your investment amount in USD</li>
              <li><strong>Take Profit</strong>: Set target profit percentage</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '15px' }}>2. Start Trading</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc' }}>
              <li>Click "Start Trading" button</li>
              <li>Bot automatically places all grid orders</li>
              <li>Monitor real-time position updates</li>
            </ul>

            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '15px', marginTop: '20px' }}>3. Monitoring</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc' }}>
              <li>View active positions with entry prices and P&L</li>
              <li>Track grid order status (pending/filled)</li>
              <li>Monitor take-profit target price</li>
              <li>Real-time profit/loss calculations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trading Concepts */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#8b5cf6', marginBottom: '20px' }}>📊 Trading Concepts</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '20px', color: '#22c55e', marginBottom: '15px' }}>Grid Trading Strategy</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>
              Places buy/sell orders at regular intervals within a specified price range:
            </p>
            <ul style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', marginTop: '10px' }}>
              <li><strong>Long Strategy</strong>: Places buy orders below current price</li>
              <li><strong>Short Strategy</strong>: Places sell orders above current price</li>
            </ul>
          </div>

          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '20px', color: '#f59e0b', marginBottom: '15px' }}>Martingale Approach</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>
              Accumulates more positions as price moves against you, lowering average entry price and increasing profit potential on reversal.
            </p>
          </div>

          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '20px', color: '#3b82f6', marginBottom: '15px' }}>Automatic Take Profit</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>
              Calculates average entry price of all positions and automatically closes entire position when target profit percentage is reached.
            </p>
          </div>

          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '20px', color: '#ef4444', marginBottom: '15px' }}>Grid Reset</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>
              After take-profit execution, automatically starts a new grid from the current market price, enabling continuous trading.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#06b6d4', marginBottom: '20px' }}>⚙️ Technical Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <ul style={{ fontSize: '14px', lineHeight: '1.8', color: '#ccc', margin: 0 }}>
              <li><strong>TypeScript</strong>: Full type safety and better development experience</li>
              <li><strong>React Hooks</strong>: Modern React patterns for state management</li>
              <li><strong>Error Handling</strong>: Comprehensive error boundaries and recovery mechanisms</li>
            </ul>
          </div>
          <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <ul style={{ fontSize: '14px', lineHeight: '1.8', color: '#ccc', margin: 0 }}>
              <li><strong>Real-time Updates</strong>: Live position and P&L monitoring</li>
              <li><strong>Responsive Design</strong>: Works on desktop and mobile devices</li>
              <li><strong>Permission Management</strong>: Handles Based.One API permissions gracefully</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)', 
          padding: '30px', 
          borderRadius: '12px',
          border: '2px solid #dc2626'
        }}>
          <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>⚠️ Risk Disclaimer</h2>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
            IMPORTANT: This bot is for educational and demonstration purposes.
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#fca5a5', margin: 0 }}>
            <li>Test thoroughly before using real funds</li>
            <li>Leveraged trading carries high risk of loss</li>
            <li>Market volatility can result in significant losses</li>
            <li>Past performance does not guarantee future results</li>
            <li>Trade at your own risk and never invest more than you can afford to lose</li>
          </ul>
        </div>
      </section>

      {/* Links */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#10b981', marginBottom: '20px' }}>🔗 Links</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <a 
            href="https://github.com/Seonwoo82/martingale-trading-bot" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'block',
              background: '#1a1a1a', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              textDecoration: 'none',
              color: '#3b82f6',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <strong>GitHub Repository</strong>
            <div style={{ fontSize: '14px', color: '#999', marginTop: '5px' }}>
              View source code and contribute
            </div>
          </a>
          
          <a 
            href="https://based.one" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'block',
              background: '#1a1a1a', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              textDecoration: 'none',
              color: '#22c55e',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <strong>Based.One Platform</strong>
            <div style={{ fontSize: '14px', color: '#999', marginTop: '5px' }}>
              Main trading platform
            </div>
          </a>
          
          <a 
            href="https://testnet.based.one" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'block',
              background: '#1a1a1a', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              textDecoration: 'none',
              color: '#f59e0b',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <strong>Based.One Testnet</strong>
            <div style={{ fontSize: '14px', color: '#999', marginTop: '5px' }}>
              Test the bot safely
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '40px 0', 
        borderTop: '1px solid #333',
        marginTop: '60px'
      }}>
        <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
          Made with ❤️ for the Based.One community
        </p>
      </footer>
    </div>
  );
};
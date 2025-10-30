import React, { useState } from 'react';
import { TradingConfig, StrategyType } from '../types';
import { AVAILABLE_COINS, TRADING_CONSTANTS } from '../constants';
import { validateTradingConfig } from '../utils/validation';
import { basedAppApi } from '../services/BasedAppApiService';

interface TradingConfigFormProps {
  onSubmit: (config: TradingConfig) => void;
  disabled?: boolean;
}

export const TradingConfigForm: React.FC<TradingConfigFormProps> = ({ onSubmit, disabled = false }) => {
  const [coin, setCoin] = useState<string>('BTC');
  const [leverage, setLeverage] = useState<number>(TRADING_CONSTANTS.DEFAULT_LEVERAGE);
  const [currentPrice, setCurrentPrice] = useState<number>(45000);
  const [fromPrice, setFromPrice] = useState<number>(45000);
  const [toPrice, setToPrice] = useState<number>(40500); // -10% from current
  const [gridCount, setGridCount] = useState<number>(TRADING_CONSTANTS.DEFAULT_GRID_COUNT);
  const [strategy, setStrategy] = useState<StrategyType>('long');
  const [takeProfitPercent, setTakeProfitPercent] = useState<number>(TRADING_CONSTANTS.DEFAULT_TAKE_PROFIT);
  const [seedAmount, setSeedAmount] = useState<number>(1000); // Default $1000
  const [errors, setErrors] = useState<string[]>([]);

  // Update prices when coin changes
  React.useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Try to fetch from API
        const marketData = await basedAppApi.getMarketData(coin);
        const price = marketData.price;
        
        setCurrentPrice(price);
        setFromPrice(price);
        setToPrice(Number((price * 0.9).toFixed(2))); // -10%
      } catch (error) {
        console.error(`Failed to fetch price for ${coin}:`, error);
        
        // Fallback to mock prices
        const mockPrices: Record<string, number> = {
          BTC: 45000,
          ETH: 2800,
          SOL: 100,
          MATIC: 0.8,
          AVAX: 35,
        };
        const price = mockPrices[coin] || 100;
        
        setCurrentPrice(price);
        setFromPrice(price);
        setToPrice(Number((price * 0.9).toFixed(2)));
      }
    };

    fetchPrice();
  }, [coin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const config: TradingConfig = {
      coin,
      leverage,
      fromPrice,
      toPrice,
      gridCount,
      strategy,
      takeProfitPercent,
      seedAmount,
    };

    const validation = validateTradingConfig(config);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      padding: '24px', 
      background: '#1a1a1a', 
      borderRadius: '12px',
      border: '1px solid #333'
    }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '24px' }}>⚙️ Trading Configuration</h2>

      {errors.length > 0 && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          {errors.map((error, idx) => (
            <div key={idx}>• {error}</div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Coin Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Coin
          </label>
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#fff',
              fontSize: '14px'
            }}
          >
            {AVAILABLE_COINS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Strategy Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as StrategyType)}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#fff',
              fontSize: '14px'
            }}
          >
            <option value="long">Long (Buy)</option>
            <option value="short">Short (Sell)</option>
          </select>
        </div>

        {/* Leverage */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Leverage: <span style={{ color: '#3b82f6' }}>{leverage}x</span>
          </label>
          <input
            type="range"
            min={TRADING_CONSTANTS.MIN_LEVERAGE}
            max={TRADING_CONSTANTS.MAX_LEVERAGE}
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            disabled={disabled}
            style={{ width: '100%', accentColor: '#3b82f6' }}
          />
        </div>

        {/* Grid Count */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Grid Count: <span style={{ color: '#3b82f6' }}>{gridCount}</span>
          </label>
          <input
            type="range"
            min={TRADING_CONSTANTS.MIN_GRID_COUNT}
            max={TRADING_CONSTANTS.MAX_GRID_COUNT}
            value={gridCount}
            onChange={(e) => setGridCount(Number(e.target.value))}
            disabled={disabled}
            style={{ width: '100%', accentColor: '#3b82f6' }}
          />
        </div>

        {/* From Price */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            From Price
          </label>
          <input
            type="number"
            step="0.01"
            value={fromPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || value === '-') {
                setFromPrice(0);
              } else {
                setFromPrice(Number(value));
              }
            }}
            onBlur={(e) => {
              // Format to 2 decimal places on blur
              const value = Number(e.target.value);
              if (!isNaN(value)) {
                setFromPrice(Number(value.toFixed(2)));
              }
            }}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>

        {/* To Price */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            To Price
          </label>
          <input
            type="number"
            step="0.01"
            value={toPrice}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || value === '-') {
                setToPrice(0);
              } else {
                setToPrice(Number(value));
              }
            }}
            onBlur={(e) => {
              // Format to 2 decimal places on blur
              const value = Number(e.target.value);
              if (!isNaN(value)) {
                setToPrice(Number(value.toFixed(2)));
              }
            }}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Seed Amount */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Seed Amount (USD)
          </label>
          <input
            type="number"
            min={10}
            step={10}
            value={seedAmount}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                setSeedAmount(value);
              }
            }}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#fff',
              fontSize: '14px'
            }}
            placeholder="Enter investment amount"
          />
        </div>

        {/* Current Price Display */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Current Price
          </label>
          <input
            type="number"
            value={currentPrice}
            disabled
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#666',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Take Profit */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#999', fontSize: '14px' }}>
            Take Profit (%)
          </label>
          <input
            type="number"
            min={TRADING_CONSTANTS.MIN_TAKE_PROFIT}
            max={TRADING_CONSTANTS.MAX_TAKE_PROFIT}
            step={0.1}
            value={takeProfitPercent}
            onChange={(e) => setTakeProfitPercent(Number(e.target.value))}
            disabled={disabled}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid #333',
              background: '#0d0d0d',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        style={{
          marginTop: '24px',
          padding: '14px 28px',
          background: disabled ? '#333' : 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
          color: disabled ? '#666' : 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          width: '100%',
          boxShadow: disabled ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => !disabled && (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {disabled ? 'Trading Active' : '▶ Start Trading'}
      </button>
    </form>
  );
};

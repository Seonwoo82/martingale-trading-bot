import React from 'react';

interface ControlPanelProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ isRunning, onStart, onStop }) => {
  return (
    <div style={{ 
      padding: '28px 32px', 
      background: isRunning ? 'linear-gradient(135deg, #1a4d2e 0%, #2d5f3f 100%)' : '#1a1a1a', 
      borderRadius: '12px',
      border: `2px solid ${isRunning ? '#22c55e' : '#333'}`,
      boxShadow: isRunning ? '0 0 20px rgba(34, 197, 94, 0.3)' : 'none'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🤖</span>
            <span>Trading Bot Status</span>
          </h3>
          <div style={{ 
            fontSize: '16px', 
            color: isRunning ? '#22c55e' : '#666',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginLeft: '34px'
          }}>
            <span style={{ fontSize: '12px' }}>{isRunning ? '●' : '○'}</span>
            {isRunning ? 'ACTIVE' : 'STOPPED'}
          </div>
        </div>

        <button
          onClick={isRunning ? onStop : onStart}
          style={{
            padding: '14px 28px',
            background: isRunning 
              ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' 
              : 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isRunning ? '⏹ Stop Trading' : '▶ Start Trading'}
        </button>
      </div>

      {isRunning && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          background: 'rgba(251, 191, 36, 0.1)', 
          borderRadius: '6px',
          fontSize: '14px',
          color: '#fbbf24',
          border: '1px solid rgba(251, 191, 36, 0.3)'
        }}>
          ⚠️ Bot is actively monitoring and placing orders. Make sure to monitor your positions.
        </div>
      )}
    </div>
  );
};

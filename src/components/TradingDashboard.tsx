import React from 'react';
import { Position, GridOrder, OrderResponse } from '../types';

interface TradingDashboardProps {
  positions: Position[];
  gridOrders: GridOrder[];
  takeProfitOrder: OrderResponse | null;
  currentPrice: number;
  totalPnL: number;
  averageEntry: number;
}

export const TradingDashboard: React.FC<TradingDashboardProps> = ({
  positions,
  gridOrders,
  takeProfitOrder,
  currentPrice,
  totalPnL,
  averageEntry,
}) => {
  const filledOrders = gridOrders.filter(o => o.status === 'filled');
  const pendingOrders = gridOrders.filter(o => o.status === 'pending');

  return (
    <div style={{ padding: '24px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
      <h2 style={{ color: '#fff', marginTop: 0, fontSize: '24px' }}>📊 Trading Dashboard</h2>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #3b82f6',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: '#93c5fd', marginBottom: '8px' }}>Current Price</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>${currentPrice.toFixed(2)}</div>
        </div>

        <div style={{
          background: averageEntry > 0 ? 'linear-gradient(135deg, #065f46 0%, #10b981 100%)' : '#0d0d0d',
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${averageEntry > 0 ? '#10b981' : '#333'}`,
          boxShadow: averageEntry > 0 ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
        }}>
          <div style={{ fontSize: '12px', color: averageEntry > 0 ? '#6ee7b7' : '#666', marginBottom: '8px' }}>Average Entry</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {averageEntry > 0 ? `$${averageEntry.toFixed(2)}` : '-'}
          </div>
        </div>

        <div style={{
          background: totalPnL >= 0
            ? 'linear-gradient(135deg, #065f46 0%, #10b981 100%)'
            : 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${totalPnL >= 0 ? '#10b981' : '#dc2626'}`,
          boxShadow: `0 4px 12px ${totalPnL >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(220, 38, 38, 0.2)'}`
        }}>
          <div style={{ fontSize: '12px', color: totalPnL >= 0 ? '#6ee7b7' : '#fca5a5', marginBottom: '8px' }}>Total P&L</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #78350f 0%, #f59e0b 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: '#fde68a', marginBottom: '8px' }}>Positions</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{positions.length}</div>
        </div>
      </div>

      {/* Take Profit Info */}
      {takeProfitOrder && (
        <div style={{
          background: 'linear-gradient(135deg, #78350f 0%, #f59e0b 100%)',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #f59e0b',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#fff', fontSize: '16px' }}>🎯 Take Profit Order Active</div>
          <div style={{ color: '#fde68a', fontSize: '14px' }}>Target Price: <span style={{ color: '#fff', fontWeight: 'bold' }}>${takeProfitOrder.price.toFixed(2)}</span></div>
          <div style={{ color: '#fde68a', fontSize: '14px' }}>Quantity: <span style={{ color: '#fff', fontWeight: 'bold' }}>{takeProfitOrder.quantity.toFixed(6)}</span></div>
        </div>
      )}

      {/* Grid Orders */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '16px' }}>Grid Orders</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#999', fontSize: '14px' }}>
              ⏳ Pending ({pendingOrders.length})
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {pendingOrders.map(order => (
                <div key={order.id} style={{
                  background: '#0d0d0d',
                  padding: '10px',
                  marginBottom: '6px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#999',
                  border: '1px solid #333'
                }}>
                  Level {order.gridLevel}: <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>${order.price.toFixed(2)}</span> ({order.side})
                </div>
              ))}
              {pendingOrders.length === 0 && (
                <div style={{ color: '#666', fontSize: '14px', textAlign: 'center', padding: '20px' }}>No pending orders</div>
              )}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#999', fontSize: '14px' }}>
              ✅ Filled ({filledOrders.length})
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filledOrders.map(order => (
                <div key={order.id} style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '10px',
                  marginBottom: '6px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#6ee7b7',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  Level {order.gridLevel}: <span style={{ color: '#10b981', fontWeight: 'bold' }}>${order.price.toFixed(2)}</span> ({order.side})
                </div>
              ))}
              {filledOrders.length === 0 && (
                <div style={{ color: '#666', fontSize: '14px', textAlign: 'center', padding: '20px' }}>No filled orders</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Positions */}
      <div>
        <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '16px' }}>Active Positions</h3>
        {positions.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0d0d0d', borderBottom: '2px solid #333' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#999', fontSize: '13px', fontWeight: '600' }}>Side</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#999', fontSize: '13px', fontWeight: '600' }}>Entry</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#999', fontSize: '13px', fontWeight: '600' }}>Current</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#999', fontSize: '13px', fontWeight: '600' }}>Size</th>
                  <th style={{ padding: '12px', textAlign: 'right', color: '#999', fontSize: '13px', fontWeight: '600' }}>P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map(pos => (
                  <tr key={pos.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: pos.side === 'long'
                          ? 'linear-gradient(135deg, #065f46 0%, #10b981 100%)'
                          : 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}>
                        {pos.side.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#999', fontSize: '14px' }}>${pos.entryPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>${pos.currentPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#999', fontSize: '14px' }}>{pos.size.toFixed(6)}</td>
                    <td style={{
                      padding: '12px',
                      textAlign: 'right',
                      color: pos.pnl >= 0 ? '#10b981' : '#dc2626',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            background: '#0d0d0d',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#666',
            border: '1px solid #333'
          }}>
            No active positions
          </div>
        )}
      </div>
    </div>
  );
};

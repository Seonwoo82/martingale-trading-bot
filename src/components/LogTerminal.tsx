import React, { useState, useEffect, useRef } from 'react';

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

interface LogTerminalProps {
  logs: LogEntry[];
  maxHeight?: string;
}

export const LogTerminal: React.FC<LogTerminalProps> = ({ logs, maxHeight = '300px' }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  const getLevelIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <div style={{ 
      background: '#1e1e1e', 
      borderRadius: '8px', 
      padding: '15px',
      fontFamily: 'monospace',
      fontSize: '13px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid #333'
      }}>
        <span style={{ color: '#fff', fontWeight: 'bold' }}>📋 Log Terminal</span>
        <span style={{ color: '#888', fontSize: '11px' }}>{logs.length} entries</span>
      </div>
      
      <div style={{ 
        maxHeight, 
        overflowY: 'auto',
        background: '#0d0d0d',
        padding: '10px',
        borderRadius: '4px'
      }}>
        {logs.length === 0 ? (
          <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
            No logs yet...
          </div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} style={{ 
              marginBottom: '8px',
              padding: '6px',
              background: '#1a1a1a',
              borderRadius: '3px',
              borderLeft: `3px solid ${getLevelColor(log.level)}`
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span>{getLevelIcon(log.level)}</span>
                <span style={{ color: '#666', fontSize: '11px', minWidth: '80px' }}>
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span style={{ color: getLevelColor(log.level), flex: 1 }}>
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

// Global logger utility
class Logger {
  private listeners: ((log: LogEntry) => void)[] = [];

  subscribe(listener: (log: LogEntry) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private log(level: LogEntry['level'], message: string) {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message
    };
    console.log(`[${level.toUpperCase()}]`, message);
    this.listeners.forEach(listener => listener(entry));
  }

  info(message: string) {
    this.log('info', message);
  }

  success(message: string) {
    this.log('success', message);
  }

  warning(message: string) {
    this.log('warning', message);
  }

  error(message: string) {
    this.log('error', message);
  }
}

export const logger = new Logger();

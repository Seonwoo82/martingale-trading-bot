// Trading Constants

export const TRADING_CONSTANTS = {
  MIN_LEVERAGE: 1,
  MAX_LEVERAGE: 100,
  MIN_GRID_COUNT: 2,
  MAX_GRID_COUNT: 50,
  MIN_TAKE_PROFIT: 0.1,
  MAX_TAKE_PROFIT: 100,
  DEFAULT_LEVERAGE: 10,
  DEFAULT_GRID_COUNT: 10,
  DEFAULT_TAKE_PROFIT: 5,
} as const;

export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_BASED_API_URL || 'https://api.based.one',
  WS_URL: process.env.REACT_APP_BASED_WS_URL || 'wss://ws.based.one',
} as const;

export const ERROR_MESSAGES = {
  INVALID_PRICE_RANGE: 'From price must be different from to price',
  INVALID_LEVERAGE: `Leverage must be between ${TRADING_CONSTANTS.MIN_LEVERAGE} and ${TRADING_CONSTANTS.MAX_LEVERAGE}`,
  INVALID_GRID_COUNT: `Grid count must be between ${TRADING_CONSTANTS.MIN_GRID_COUNT} and ${TRADING_CONSTANTS.MAX_GRID_COUNT}`,
  INVALID_TAKE_PROFIT: `Take profit must be between ${TRADING_CONSTANTS.MIN_TAKE_PROFIT}% and ${TRADING_CONSTANTS.MAX_TAKE_PROFIT}%`,
  CONNECTION_FAILED: 'Failed to connect to Based App',
  ORDER_FAILED: 'Failed to place order',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
} as const;

export const AVAILABLE_COINS = ['BTC', 'ETH', 'SOL', 'MATIC', 'AVAX'] as const;

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000,
  MAX_DELAY: 10000,
  BACKOFF_MULTIPLIER: 2,
} as const;

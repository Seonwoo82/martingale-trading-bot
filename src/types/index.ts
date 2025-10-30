// Core Trading Types

export type StrategyType = 'long' | 'short';
export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type OrderStatus = 'pending' | 'filled' | 'cancelled' | 'partial';

export interface TradingConfig {
  coin: string;
  leverage: number;
  fromPrice: number;
  toPrice: number;
  gridCount: number;
  strategy: StrategyType;
  takeProfitPercent: number;
  seedAmount: number; // Investment amount in USD
}

export interface Position {
  id: string;
  symbol: string;
  side: StrategyType;
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  leverage: number;
  timestamp: Date;
}

export interface GridOrder {
  id: string;
  price: number;
  quantity: number;
  side: OrderSide;
  status: OrderStatus;
  gridLevel: number;
  filledQuantity?: number;
}

export interface GridLevel {
  level: number;
  price: number;
  quantity: number;
  side: OrderSide;
}

export interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  change24h: number;
  timestamp: Date;
}

export interface OrderRequest {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
  leverage?: number;
}

export interface OrderResponse {
  orderId: string;
  symbol: string;
  side: OrderSide;
  price: number;
  quantity: number;
  status: OrderStatus;
  timestamp: Date;
}

export interface OrderFill {
  orderId: string;
  price: number;
  quantity: number;
  timestamp: Date;
}

export interface ApiCredentials {
  apiKey: string;
  apiSecret: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
}

export interface RateLimitInfo {
  remaining: number;
  reset: Date;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

// Application State
export interface AppState {
  trading: TradingState;
  market: MarketState;
  api: ApiState;
  ui: UIState;
}

export interface TradingState {
  config: TradingConfig | null;
  isRunning: boolean;
  positions: Position[];
  gridOrders: GridOrder[];
  takeProfitOrder: OrderResponse | null;
  currentPrice: number;
  totalPnL: number;
}

export interface MarketState {
  availableCoins: string[];
  marketData: Record<string, MarketData>;
}

export interface ApiState {
  isConnected: boolean;
  credentials: ApiCredentials | null;
  rateLimitStatus: RateLimitInfo | null;
}

export interface UIState {
  loading: boolean;
  error: string | null;
  notifications: Notification[];
}

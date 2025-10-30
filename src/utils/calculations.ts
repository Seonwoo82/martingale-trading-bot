import { Position, GridLevel, StrategyType, OrderSide } from '../types';

/**
 * Calculate grid levels based on price range and count
 */
export const calculateGridLevels = (
  fromPrice: number,
  toPrice: number,
  gridCount: number,
  strategy: StrategyType
): GridLevel[] => {
  const levels: GridLevel[] = [];
  const priceStep = Math.abs(toPrice - fromPrice) / gridCount;
  const isLong = strategy === 'long';
  
  // For long strategy: place buy orders below current price (descending)
  // For short strategy: place sell orders above current price (ascending)
  const startPrice = isLong ? fromPrice : toPrice;
  const direction = isLong ? -1 : 1;

  for (let i = 0; i < gridCount; i++) {
    const price = startPrice + (direction * priceStep * i);
    levels.push({
      level: i + 1,
      price: Number(price.toFixed(2)),
      quantity: 0.01, // Default quantity, should be calculated based on balance
      side: isLong ? 'buy' : 'sell',
    });
  }

  return levels;
};

/**
 * Calculate average entry price from positions
 */
export const calculateAverageEntryPrice = (positions: Position[]): number => {
  if (positions.length === 0) return 0;

  const totalValue = positions.reduce((sum, pos) => sum + (pos.entryPrice * pos.size), 0);
  const totalSize = positions.reduce((sum, pos) => sum + pos.size, 0);

  return totalSize > 0 ? totalValue / totalSize : 0;
};

/**
 * Calculate total P&L from positions
 */
export const calculateTotalPnL = (positions: Position[]): number => {
  return positions.reduce((sum, pos) => sum + pos.pnl, 0);
};

/**
 * Calculate take profit price based on average entry and target percentage
 */
export const calculateTakeProfitPrice = (
  averageEntry: number,
  takeProfitPercent: number,
  strategy: StrategyType
): number => {
  const multiplier = strategy === 'long' ? (1 + takeProfitPercent / 100) : (1 - takeProfitPercent / 100);
  return Number((averageEntry * multiplier).toFixed(2));
};

/**
 * Calculate P&L for a single position
 */
export const calculatePositionPnL = (
  entryPrice: number,
  currentPrice: number,
  size: number,
  side: StrategyType,
  leverage: number
): number => {
  const priceChange = side === 'long' ? (currentPrice - entryPrice) : (entryPrice - currentPrice);
  const pnlPercent = (priceChange / entryPrice) * 100;
  return (pnlPercent * leverage * size) / 100;
};

/**
 * Calculate total position size
 */
export const calculateTotalPositionSize = (positions: Position[]): number => {
  return positions.reduce((sum, pos) => sum + pos.size, 0);
};

/**
 * Calculate grid quantity based on balance and grid count
 */
export const calculateGridQuantity = (
  balance: number,
  gridCount: number,
  leverage: number,
  price: number
): number => {
  const availablePerGrid = (balance * leverage) / gridCount;
  return Number((availablePerGrid / price).toFixed(6));
};

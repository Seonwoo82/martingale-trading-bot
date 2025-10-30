import { Position, OrderFill, StrategyType } from '../types';
import { 
  calculateAverageEntryPrice, 
  calculateTotalPnL, 
  calculatePositionPnL,
  calculateTotalPositionSize 
} from '../utils/calculations';

export class PositionManager {
  private positions: Position[] = [];
  private currentPrice: number = 0;

  /**
   * Update current market price
   */
  updateCurrentPrice(price: number): void {
    this.currentPrice = price;
    this.updatePositionsPnL();
  }

  /**
   * Add new position from order fill
   */
  addPosition(fill: OrderFill, symbol: string, side: StrategyType, leverage: number): void {
    const position: Position = {
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      symbol,
      side,
      size: fill.quantity,
      entryPrice: fill.price,
      currentPrice: this.currentPrice || fill.price,
      pnl: 0,
      leverage,
      timestamp: fill.timestamp,
    };

    this.positions.push(position);
    this.updatePositionsPnL();
  }

  /**
   * Update positions with new fills
   */
  updatePositions(fills: OrderFill[], symbol: string, side: StrategyType, leverage: number): void {
    for (const fill of fills) {
      this.addPosition(fill, symbol, side, leverage);
    }
  }

  /**
   * Update P&L for all positions
   */
  private updatePositionsPnL(): void {
    for (const position of this.positions) {
      position.currentPrice = this.currentPrice;
      position.pnl = calculatePositionPnL(
        position.entryPrice,
        this.currentPrice,
        position.size,
        position.side,
        position.leverage
      );
    }
  }

  /**
   * Get all active positions
   */
  getActivePositions(): Position[] {
    return this.positions;
  }

  /**
   * Calculate average entry price
   */
  calculateAverageEntryPrice(): number {
    return calculateAverageEntryPrice(this.positions);
  }

  /**
   * Get total P&L
   */
  getTotalPnL(): number {
    return calculateTotalPnL(this.positions);
  }

  /**
   * Get total position size
   */
  getTotalSize(): number {
    return calculateTotalPositionSize(this.positions);
  }

  /**
   * Clear all positions (after take profit)
   */
  clearPositions(): void {
    this.positions = [];
  }

  /**
   * Get position count
   */
  getPositionCount(): number {
    return this.positions.length;
  }

  /**
   * Check if has positions
   */
  hasPositions(): boolean {
    return this.positions.length > 0;
  }
}

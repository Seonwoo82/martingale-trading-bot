import { OrderResponse, StrategyType } from '../types';
import { calculateTakeProfitPrice } from '../utils/calculations';
import { basedAppApi } from './BasedAppApiService';

export class TakeProfitManager {
  private takeProfitOrder: OrderResponse | null = null;
  private symbol: string = '';
  private strategy: StrategyType = 'long';

  /**
   * Set trading symbol and strategy
   */
  setConfig(symbol: string, strategy: StrategyType): void {
    this.symbol = symbol;
    this.strategy = strategy;
  }

  /**
   * Calculate take profit price
   */
  calculateTakeProfitPrice(averageEntry: number, takeProfitPercent: number): number {
    return calculateTakeProfitPrice(averageEntry, takeProfitPercent, this.strategy);
  }

  /**
   * Place take profit order
   */
  async placeTakeProfitOrder(
    averageEntry: number,
    quantity: number,
    takeProfitPercent: number
  ): Promise<OrderResponse> {
    const tpPrice = this.calculateTakeProfitPrice(averageEntry, takeProfitPercent);
    
    try {
      const order = await basedAppApi.placeOrder({
        symbol: this.symbol,
        side: this.strategy === 'long' ? 'sell' : 'buy',
        type: 'limit',
        quantity,
        price: tpPrice,
      });

      this.takeProfitOrder = order;
      return order;
    } catch (error) {
      throw new Error(`Failed to place take profit order: ${error}`);
    }
  }

  /**
   * Update take profit order with new price and quantity
   */
  async updateTakeProfitOrder(
    newAverageEntry: number,
    newQuantity: number,
    takeProfitPercent: number
  ): Promise<void> {
    // Cancel existing TP order
    if (this.takeProfitOrder) {
      await this.cancelTakeProfitOrder();
    }

    // Place new TP order
    await this.placeTakeProfitOrder(newAverageEntry, newQuantity, takeProfitPercent);
  }

  /**
   * Cancel take profit order
   */
  async cancelTakeProfitOrder(): Promise<void> {
    if (this.takeProfitOrder) {
      try {
        await basedAppApi.cancelOrder(this.takeProfitOrder.orderId);
        this.takeProfitOrder = null;
      } catch (error) {
        console.error('Failed to cancel take profit order:', error);
      }
    }
  }

  /**
   * Get current take profit order
   */
  getTakeProfitOrder(): OrderResponse | null {
    return this.takeProfitOrder;
  }

  /**
   * Check if take profit order exists
   */
  hasTakeProfitOrder(): boolean {
    return this.takeProfitOrder !== null;
  }

  /**
   * Clear take profit order (after execution)
   */
  clearTakeProfitOrder(): void {
    this.takeProfitOrder = null;
  }
}

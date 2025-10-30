import { GridLevel, GridOrder, TradingConfig, OrderSide } from '../types';
import { calculateGridLevels, calculateGridQuantity } from '../utils/calculations';
import { basedAppApi } from './BasedAppApiService';

export class GridManager {
  private gridOrders: GridOrder[] = [];
  private config: TradingConfig | null = null;

  /**
   * Initialize grid with configuration
   */
  setConfig(config: TradingConfig): void {
    this.config = config;
  }

  /**
   * Calculate grid levels based on configuration
   */
  calculateGridLevels(): GridLevel[] {
    if (!this.config) {
      throw new Error('Grid configuration not set');
    }

    return calculateGridLevels(
      this.config.fromPrice,
      this.config.toPrice,
      this.config.gridCount,
      this.config.strategy
    );
  }

  /**
   * Place grid orders - all at once
   */
  async placeGridOrders(balance: number = 1000): Promise<GridOrder[]> {
    if (!this.config) {
      throw new Error('Grid configuration not set');
    }

    const levels = this.calculateGridLevels();
    const orders: GridOrder[] = [];

    // Place all orders in parallel for faster execution
    const orderPromises = levels.map(async (level) => {
      try {
        const quantity = calculateGridQuantity(
          balance,
          this.config!.gridCount,
          this.config!.leverage,
          level.price
        );

        const orderResponse = await basedAppApi.placeOrder({
          symbol: this.config!.coin,
          side: level.side,
          type: 'limit',
          quantity,
          price: level.price,
          leverage: this.config!.leverage,
        });

        const gridOrder: GridOrder = {
          id: orderResponse.orderId,
          price: level.price,
          quantity,
          side: level.side,
          status: 'pending',
          gridLevel: level.level,
        };

        return gridOrder;
      } catch (error) {
        return null;
      }
    });

    // Wait for all orders to complete
    const results = await Promise.all(orderPromises);
    
    // Filter out failed orders
    const successfulOrders = results.filter((order): order is GridOrder => order !== null);
    
    this.gridOrders = successfulOrders;
    
    return successfulOrders;
  }

  /**
   * Update grid orders based on fills
   */
  async updateGridOrders(filledOrderIds: string[]): Promise<void> {
    for (const orderId of filledOrderIds) {
      const order = this.gridOrders.find(o => o.id === orderId);
      if (order) {
        order.status = 'filled';
      }
    }
  }

  /**
   * Reset grid with new starting price
   */
  async resetGrid(newStartPrice: number, balance: number = 1000): Promise<GridOrder[]> {
    if (!this.config) {
      throw new Error('Grid configuration not set');
    }

    // Cancel all pending orders
    await this.cancelAllOrders();

    // Update config with new starting price
    const priceRange = Math.abs(this.config.toPrice - this.config.fromPrice);
    this.config = {
      ...this.config,
      fromPrice: newStartPrice,
      toPrice: this.config.strategy === 'long' 
        ? newStartPrice - priceRange 
        : newStartPrice + priceRange,
    };

    // Place new grid orders
    return this.placeGridOrders(balance);
  }

  /**
   * Cancel all pending grid orders
   */
  async cancelAllOrders(): Promise<void> {
    const pendingOrders = this.gridOrders.filter(o => o.status === 'pending');
    
    for (const order of pendingOrders) {
      try {
        await basedAppApi.cancelOrder(order.id);
        order.status = 'cancelled';
      } catch (error) {
        // Silently handle cancellation errors
      }
    }
  }

  /**
   * Get current grid orders
   */
  getGridOrders(): GridOrder[] {
    return this.gridOrders;
  }

  /**
   * Get filled orders
   */
  getFilledOrders(): GridOrder[] {
    return this.gridOrders.filter(o => o.status === 'filled');
  }

  /**
   * Get pending orders
   */
  getPendingOrders(): GridOrder[] {
    return this.gridOrders.filter(o => o.status === 'pending');
  }
}

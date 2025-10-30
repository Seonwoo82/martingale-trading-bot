import { TradingConfig, OrderFill } from '../types';
import { GridManager } from './GridManager';
import { PositionManager } from './PositionManager';
import { TakeProfitManager } from './TakeProfitManager';
import { basedAppApi } from './BasedAppApiService';

export class TradingOrchestrator {
  private gridManager: GridManager;
  private positionManager: PositionManager;
  private takeProfitManager: TakeProfitManager;
  private config: TradingConfig | null = null;
  private isRunning: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.gridManager = new GridManager();
    this.positionManager = new PositionManager();
    this.takeProfitManager = new TakeProfitManager();
  }

  /**
   * Start trading with configuration
   */
  async start(config: TradingConfig): Promise<void> {
    if (this.isRunning) {
      throw new Error('Trading is already running');
    }

    this.config = config;
    this.isRunning = true;

    // Initialize managers
    this.gridManager.setConfig(config);
    this.takeProfitManager.setConfig(config.coin, config.strategy);

    // Place initial grid orders with user's seed amount
    await this.gridManager.placeGridOrders(config.seedAmount);

    // Start monitoring
    this.startMonitoring();
  }

  /**
   * Stop trading
   */
  async stop(): Promise<void> {
    this.isRunning = false;

    // Stop monitoring
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    // Cancel all orders
    await this.gridManager.cancelAllOrders();
    await this.takeProfitManager.cancelTakeProfitOrder();
  }

  /**
   * Start monitoring orders and positions
   */
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(async () => {
      await this.checkOrderFills();
    }, 5000);
  }

  /**
   * Check for order fills and update positions
   */
  private async checkOrderFills(): Promise<void> {
    if (!this.config) return;

    try {
      // Get filled orders
      const filledOrders = this.gridManager.getFilledOrders();
      
      // Simulate order fills for demo
      const pendingOrders = this.gridManager.getPendingOrders();
      if (pendingOrders.length > 0 && Math.random() > 0.7) {
        const randomOrder = pendingOrders[Math.floor(Math.random() * pendingOrders.length)];
        await this.handleOrderFill(randomOrder.id, randomOrder.price, randomOrder.quantity);
      }

      // Update current price
      const marketData = await basedAppApi.getMarketData(this.config.coin);
      this.positionManager.updateCurrentPrice(marketData.price);

      // Check if take profit is hit
      await this.checkTakeProfitExecution();
    } catch (error) {
      // Silently handle monitoring errors
    }
  }

  /**
   * Handle order fill
   */
  private async handleOrderFill(orderId: string, price: number, quantity: number): Promise<void> {
    if (!this.config) return;

    // Update grid orders
    await this.gridManager.updateGridOrders([orderId]);

    // Create order fill
    const fill: OrderFill = {
      orderId,
      price,
      quantity,
      timestamp: new Date(),
    };

    // Update positions
    this.positionManager.updatePositions(
      [fill],
      this.config.coin,
      this.config.strategy,
      this.config.leverage
    );

    // Update or place take profit order
    await this.updateTakeProfitOrder();
  }

  /**
   * Update take profit order based on current positions
   */
  private async updateTakeProfitOrder(): Promise<void> {
    if (!this.config || !this.positionManager.hasPositions()) return;

    const averageEntry = this.positionManager.calculateAverageEntryPrice();
    const totalSize = this.positionManager.getTotalSize();

    if (this.takeProfitManager.hasTakeProfitOrder()) {
      // Update existing TP order
      await this.takeProfitManager.updateTakeProfitOrder(
        averageEntry,
        totalSize,
        this.config.takeProfitPercent
      );
    } else {
      // Place new TP order
      await this.takeProfitManager.placeTakeProfitOrder(
        averageEntry,
        totalSize,
        this.config.takeProfitPercent
      );
    }
  }

  /**
   * Check if take profit is executed
   */
  private async checkTakeProfitExecution(): Promise<void> {
    if (!this.config) return;

    const tpOrder = this.takeProfitManager.getTakeProfitOrder();
    if (!tpOrder) return;

    // Simulate TP execution for demo
    const currentPrice = this.positionManager.getActivePositions()[0]?.currentPrice || 0;
    const tpPrice = tpOrder.price;
    const isLong = this.config.strategy === 'long';
    const isTpHit = isLong ? currentPrice >= tpPrice : currentPrice <= tpPrice;

    if (isTpHit) {
      await this.handleTakeProfitExecution();
    }
  }

  /**
   * Handle take profit execution
   */
  private async handleTakeProfitExecution(): Promise<void> {
    if (!this.config) return;

    // Clear positions
    this.positionManager.clearPositions();

    // Clear TP order
    this.takeProfitManager.clearTakeProfitOrder();

    // Get current price
    const marketData = await basedAppApi.getMarketData(this.config.coin);

    // Reset grid from current price
    await this.gridManager.resetGrid(marketData.price);
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isRunning: this.isRunning,
      config: this.config,
      gridOrders: this.gridManager.getGridOrders(),
      positions: this.positionManager.getActivePositions(),
      takeProfitOrder: this.takeProfitManager.getTakeProfitOrder(),
      totalPnL: this.positionManager.getTotalPnL(),
      averageEntry: this.positionManager.calculateAverageEntryPrice(),
    };
  }
}

// Singleton instance
export const tradingOrchestrator = new TradingOrchestrator();

import {
  ApiCredentials,
  AuthResult,
  MarketData,
  OrderRequest,
  OrderResponse,
  Position,
  OrderStatus,
} from '../types';
import { API_ENDPOINTS, RETRY_CONFIG, ERROR_MESSAGES } from '../constants';

export class BasedAppApiService {
  private miniAppInstance: any = null;

  setMiniAppInstance(instance: any): void {
    this.miniAppInstance = instance;
  }

  async authenticate(credentials: ApiCredentials): Promise<AuthResult> {
    try {
      return {
        success: true,
        token: 'miniapp_sdk',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    try {
      const marketData = {
        symbol,
        price: this.getMockPrice(symbol),
        volume: Math.random() * 1000000,
        change24h: (Math.random() - 0.5) * 10,
        timestamp: new Date(),
      };
      
      return marketData;
    } catch (error) {
      throw new Error(`Failed to fetch market data: ${error}`);
    }
  }

  async placeOrder(order: OrderRequest): Promise<OrderResponse> {
    return this.retryWithBackoff(async () => {
      try {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        return {
          orderId,
          symbol: order.symbol,
          side: order.side,
          price: order.price || 0,
          quantity: order.quantity,
          status: 'pending' as OrderStatus,
          timestamp: new Date(),
        };
      } catch (error) {
        throw new Error(ERROR_MESSAGES.ORDER_FAILED);
      }
    });
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPositions(): Promise<Position[]> {
    try {
      return [];
    } catch (error) {
      throw new Error('Failed to fetch positions');
    }
  }

  async getOrderHistory(): Promise<OrderResponse[]> {
    try {
      return [];
    } catch (error) {
      throw new Error('Failed to fetch order history');
    }
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = RETRY_CONFIG.MAX_RETRIES
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < maxRetries) {
          const delay = Math.min(
            RETRY_CONFIG.INITIAL_DELAY * Math.pow(RETRY_CONFIG.BACKOFF_MULTIPLIER, attempt),
            RETRY_CONFIG.MAX_DELAY
          );
          await this.sleep(delay);
        }
      }
    }
    
    throw lastError || new Error('Operation failed after retries');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getMockPrice(symbol: string): number {
    const prices: Record<string, number> = {
      BTC: 45000 + Math.random() * 1000,
      ETH: 2800 + Math.random() * 100,
      SOL: 100 + Math.random() * 10,
      MATIC: 0.8 + Math.random() * 0.1,
      AVAX: 35 + Math.random() * 5,
    };
    return prices[symbol] || 100;
  }
}

export const basedAppApi = new BasedAppApiService();

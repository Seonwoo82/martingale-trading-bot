import { TradingConfig } from '../types';
import { TRADING_CONSTANTS, ERROR_MESSAGES } from '../constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateTradingConfig = (config: Partial<TradingConfig>): ValidationResult => {
  const errors: string[] = [];

  // Validate coin
  if (!config.coin || config.coin.trim() === '') {
    errors.push('Coin symbol is required');
  }

  // Validate leverage
  if (config.leverage !== undefined) {
    if (config.leverage < TRADING_CONSTANTS.MIN_LEVERAGE || config.leverage > TRADING_CONSTANTS.MAX_LEVERAGE) {
      errors.push(ERROR_MESSAGES.INVALID_LEVERAGE);
    }
  }

  // Validate price range
  if (config.fromPrice !== undefined && config.toPrice !== undefined) {
    if (config.fromPrice === config.toPrice) {
      errors.push(ERROR_MESSAGES.INVALID_PRICE_RANGE);
    }
    if (config.fromPrice <= 0 || config.toPrice <= 0) {
      errors.push('Prices must be greater than 0');
    }
  }

  // Validate grid count
  if (config.gridCount !== undefined) {
    if (config.gridCount < TRADING_CONSTANTS.MIN_GRID_COUNT || config.gridCount > TRADING_CONSTANTS.MAX_GRID_COUNT) {
      errors.push(ERROR_MESSAGES.INVALID_GRID_COUNT);
    }
  }

  // Validate take profit percentage
  if (config.takeProfitPercent !== undefined) {
    if (config.takeProfitPercent < TRADING_CONSTANTS.MIN_TAKE_PROFIT || config.takeProfitPercent > TRADING_CONSTANTS.MAX_TAKE_PROFIT) {
      errors.push(ERROR_MESSAGES.INVALID_TAKE_PROFIT);
    }
  }

  // Validate strategy
  if (config.strategy && !['long', 'short'].includes(config.strategy)) {
    errors.push('Strategy must be either "long" or "short"');
  }

  // Validate seed amount
  if (config.seedAmount !== undefined) {
    if (config.seedAmount <= 0) {
      errors.push('Seed amount must be greater than 0');
    }
    if (config.seedAmount < 10) {
      errors.push('Minimum seed amount is $10');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePriceRange = (fromPrice: number, toPrice: number): boolean => {
  return fromPrice > 0 && toPrice > 0 && fromPrice !== toPrice;
};

export const validateGridCount = (count: number): boolean => {
  return count >= TRADING_CONSTANTS.MIN_GRID_COUNT && count <= TRADING_CONSTANTS.MAX_GRID_COUNT;
};

export const validateLeverage = (leverage: number): boolean => {
  return leverage >= TRADING_CONSTANTS.MIN_LEVERAGE && leverage <= TRADING_CONSTANTS.MAX_LEVERAGE;
};

export const validateTakeProfitPercent = (percent: number): boolean => {
  return percent >= TRADING_CONSTANTS.MIN_TAKE_PROFIT && percent <= TRADING_CONSTANTS.MAX_TAKE_PROFIT;
};

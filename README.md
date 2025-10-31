# 🤖 Martingale Trading Bot

<p align="center">
  <img src="public/martingale-bot-icon.png" alt="Martingale Trading Bot" width="200"/>
</p>

An automated grid trading bot for Based using martingale strategy with intelligent position management and automatic take-profit execution.

## ✨ Features

- **Grid Trading Strategy**: Automatically places grid orders within specified price ranges
- **Long/Short Support**: Choose between long or short positions based on market conditions
- **Automatic Take Profit**: Automatically closes positions when target profit percentage is reached
- **Grid Reset**: Automatically creates new grids from current price after take-profit execution
- **Real-time Monitoring**: Live tracking of positions, orders, and P&L
- **Dark Theme UI**: Modern, professional interface optimized for trading
- **Configurable Parameters**: Customize coin, leverage, price range, grid count, and more

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

### Running on Based.One

1. Visit [https://testnet.based.one](https://testnet.based.one)
2. Click the bug icon in the lower right corner
3. Enter App ID: `martingale01`
4. Enter URL: `http://localhost:3000`
5. Click "Load app"

## 📖 How to Use

### 1. Trading Configuration
- **Coin Selection**: Choose from BTC, ETH, SOL, MATIC, AVAX
- **Leverage**: Set leverage from 1x to 100x
- **Price Range**: Define From Price and To Price for grid placement
- **Grid Count**: Set number of grid levels (2-50)
- **Strategy**: Choose Long (buy) or Short (sell) strategy
- **Seed Amount**: Set your investment amount in USD
- **Take Profit**: Set target profit percentage

### 2. Start Trading
- Click "Start Trading" button
- Bot automatically places all grid orders
- Monitor real-time position updates

### 3. Monitoring
- View active positions with entry prices and P&L
- Track grid order status (pending/filled)
- Monitor take-profit target price
- Real-time profit/loss calculations

### 4. Stop Trading
- Use "Stop Trading" button to halt operations anytime
- All pending orders will be cancelled

## 🏗️ Project Structure

```
src/
├── components/              # React UI Components
│   ├── TradingConfigForm.tsx    # Trading parameter configuration
│   ├── TradingDashboard.tsx     # Real-time trading dashboard
│   └── ControlPanel.tsx         # Start/stop controls
├── services/               # Business Logic
│   ├── BasedAppApiService.ts    # Based.One API integration
│   ├── GridManager.ts           # Grid order management
│   ├── PositionManager.ts       # Position tracking & P&L
│   ├── TakeProfitManager.ts     # Automatic take-profit logic
│   └── TradingOrchestrator.ts   # Main trading coordination
├── types/                  # TypeScript Definitions
│   └── index.ts                 # Core type definitions
├── utils/                  # Utility Functions
│   ├── calculations.ts          # Trading calculations
│   └── validation.ts            # Input validation
├── constants/              # Configuration
│   └── index.ts                 # Trading constants
└── App.tsx                 # Main application component
```

## 📊 Trading Concepts

### Grid Trading Strategy
Places buy/sell orders at regular intervals within a specified price range:
- **Long Strategy**: Places buy orders below current price
- **Short Strategy**: Places sell orders above current price

### Martingale Approach
Accumulates more positions as price moves against you, lowering average entry price and increasing profit potential on reversal.

### Automatic Take Profit
Calculates average entry price of all positions and automatically closes entire position when target profit percentage is reached.

### Grid Reset
After take-profit execution, automatically starts a new grid from the current market price, enabling continuous trading.

## ⚙️ Technical Features

- **TypeScript**: Full type safety and better development experience
- **React Hooks**: Modern React patterns for state management
- **Error Handling**: Comprehensive error boundaries and recovery mechanisms
- **Real-time Updates**: Live position and P&L monitoring
- **Responsive Design**: Works on desktop and mobile devices
- **Permission Management**: Handles Based.One API permissions gracefully

## 🔧 Configuration

### Environment Variables
```bash
REACT_APP_BASED_API_URL=https://api.based.one
REACT_APP_BASED_WS_URL=wss://ws.based.one
REACT_APP_APP_ID=martingale01
REACT_APP_APP_NAME=Martingale Trading Bot
```

### Trading Constants
- Min/Max Leverage: 1x - 100x
- Min/Max Grid Count: 2 - 50
- Min/Max Take Profit: 0.1% - 100%
- Default Settings: 10x leverage, 10 grids, 5% take profit

## ⚠️ Risk Disclaimer

**IMPORTANT: This bot is for educational and demonstration purposes.**

- Test thoroughly before using real funds
- Leveraged trading carries high risk of loss
- Market volatility can result in significant losses
- Past performance does not guarantee future results
- Trade at your own risk and never invest more than you can afford to lose

## 🛠️ Development

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Deployment
The app is configured for easy deployment on Vercel, Netlify, or similar platforms.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

## 🔗 Links

- **GitHub Repository**: [Martingale Trading Bot](https://github.com/Seonwoo82/martingale-trading-bot)
- **Based.One Platform**: [https://based.one](https://based.one)
- **Based.One Testnet**: [https://testnet.based.one](https://testnet.based.one)

---

<p align="center">
  Made with ❤️ for the Based.One community
</p>
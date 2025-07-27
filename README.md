# 🎮 Somnia Gaming - Doodle Jump with Blockchain Rewards

A Next.js-based gaming platform that combines the classic Doodle Jump game with Somnia blockchain rewards. Players can earn SOM coins by playing and then swap them for Real STT tokens on decentralized exchanges.

![Somnia Gaming](https://img.shields.io/badge/Somnia-Gaming-purple?style=for-the-badge&logo=ethereum)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌐 Live Demo

**[🎮 Play Somnia Doodle Jump Now](https://somnia-doodle.vercel.app/)**

Experience the game live with blockchain rewards!

> **💡 Note**: You'll need a small amount of STT tokens for gas fees to claim your rewards. Get free STT tokens from the [Somnia Testnet Faucet](https://testnet.somnia.network/).

## 🚀 Features

- **🎮 Classic Doodle Jump Game**: Play the beloved platformer game with modern Web3 integration
- **💰 Earn SOM Coins**: Get rewarded with SOM coins based on your game score
- **🔄 Token Swapping**: Swap earned SOM coins for Real STT tokens on Euclid Protocol
- **🔗 Multi-Chain Support**: Supports multiple testnet chains including Somnia Testnet
- **🎨 Modern UI**: Beautiful, responsive design with dark theme and animations
- **⚡ Real-time Rewards**: Instant token claiming after gameplay
- **🔐 Secure Wallet Integration**: Seamless Web3 wallet connection

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Blockchain**: Thirdweb SDK, Ethers.js
- **Chains**: Somnia Testnet, Sepolia, Polygon Amoy, Base Sepolia, Arbitrum Sepolia
- **Deployment**: Vercel-ready

## 📋 Prerequisites for local development 

- Node.js 18+ 
- npm, yarn, or pnpm
- Web3 wallet (MetaMask, WalletConnect, etc.)
- Somnia Testnet tokens for gas fees
- Thirdweb client ID (required for local development and production)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd somnia-doodle
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Play

1. **Connect Wallet**: Connect your Web3 wallet to the application
2. **Start Playing**: Navigate to the game page and start playing Doodle Jump
3. **Earn Tokens**: Score points to earn SOM coins (1 coin per 10 points)
4. **Claim Rewards**: Claim your earned tokens on the claim page
5. **Swap Tokens**: Convert SOM coins to Real STT tokens on Euclid Protocol

## 🔗 Blockchain Information

### Token Contract Details On Somnia Testnet
- **Som Token Contract Address**: `0xBBA810e84d2049aC7604618447b78BE2Ab146330`
- **Token Explorer**: [View on Somnia Explorer](https://shannon-explorer.somnia.network/token/0xBBA810e84d2049aC7604618447b78BE2Ab146330?tab=contract)
- **Token Name**: SomCoin
- **Token Symbol**: SMC
- **Network**: Somnia Testnet
- **Token Drop Transaction Hash**: [`0xcd99e1031d1e5a1240a881a1152a059768841d152ab168152b816df9c2eeb026`](https://shannon-explorer.somnia.network/tx/0xcd99e1031d1e5a1240a881a1152a059768841d152ab168152b816df9c2eeb026)

### Supported Networks
- **Somnia Testnet** (Primary)
- **Sepolia Testnet**
- **Polygon Amoy Testnet**


## 🎮 Game Mechanics

### Doodle Jump Controls
- **Move Left**: Left Arrow Key or 'A'
- **Move Right**: Right Arrow Key or 'D'
- **Start/Restart**: Spacebar
- **Objective**: Jump on platforms and avoid falling

### Token Rewards
- **Scoring System**: 1 SOM coin per 10 points scored
- **Maximum Reward**: No limit - the higher you score, the more you earn
- **Instant Claiming**: Tokens are immediately available for claiming after game over

## 🔄 Token Swapping

### Euclid Protocol Integration
- **DEX URL**: [https://testnet.euclidswap.io/swap](https://testnet.euclidswap.io/swap)
- **Supported Pair**: SOM ↔ STT
- **Purpose**: Convert gaming rewards to utility tokens

## 📁 Project Structure

```
thirdweb-wallet-connect/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── game/              # Game page
│   ├── claim/             # Token claiming page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── doodle-jump-game.tsx  # Game component
│   ├── navbar.tsx         # Navigation
│   └── ui/               # UI components
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Environment Variables

- `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`: Your Thirdweb client ID for Web3 functionality

**Note**: The Thirdweb client ID is required for both local development and production use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Somnia Network** for the gaming-focused blockchain
- **Euclid Protocol** for the DEX integration
- **Thirdweb** for the Web3 development tools
- **Next.js** for the React framework
- **Tailwind CSS** for the styling framework

## 📞 Support

For support and questions:
- Create an issue in this repository
- Join the Somnia community
- Check the [Somnia documentation](https://docs.somnia.com)

---

**Built with ❤️ for the Somnia Hackathon 2025** 
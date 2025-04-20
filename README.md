# Connect Four Game

A web-based implementation of the classic Connect Four game, featuring an AI opponent using the minimax algorithm. Built with Phaser.js and Vite.

## Features

- Player vs AI gameplay
- AI opponent using minimax algorithm for decision making
- Modern web interface using Phaser.js
- Real-time game state visualization
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- For development with ngrok: ngrok CLI installed (optional)

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd 4inrow
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

To start with ngrok tunnel (for sharing):
```bash
npm run dev:tunnel
```

## Project Structure

- `game.js` - Main game initialization and setup
- `gameLogic.js` - Game logic and AI implementation
- `gameObjects.js` - Game object definitions
- `constants.js` - Game constants and configuration
- `vite.config.js` - Vite configuration
- `index.html` - Main HTML entry point

## AI Implementation

The AI uses the minimax algorithm to determine the best move. It evaluates positions based on:
- Winning positions
- Potential winning sequences
- Board position weights
- Look-ahead depth of 4 moves

## Scripts

- `npm run dev` - Start development server
- `npm run dev:tunnel` - Start development server with ngrok tunnel
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 
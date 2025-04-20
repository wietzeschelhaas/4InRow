# Connect Four Game

A web-based implementation of the classic Connect Four game, featuring an AI opponent using the minimax algorithm. Built with Phaser.js and Vite.

## Features

- Player vs AI gameplay
- AI opponent using minimax algorithm for decision making

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

## Scripts

- `npm run dev` - Start development server
- `npm run dev:tunnel` - Start development server with ngrok tunnel
- `npm run lint` - Run ESLint

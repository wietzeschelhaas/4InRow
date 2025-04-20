import Phaser from 'phaser';
import { COLORS } from './constants.js';
import { createBoard, createTurnText, createTile } from './gameObjects.js';
import { checkWin, isBoardFull, getAIMove, printBoard } from './gameLogic.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    backgroundColor: COLORS.BACKGROUND,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game constants
const COLUMNS = 7;
const ROWS = 6;
const SLOT_SIZE = 100;
const SLOT_PADDING = 10;
const BOARD_OFFSET_X = 100;
const BOARD_OFFSET_Y = 100;

const game = new Phaser.Game(config);

// Game state
let gameState = {
    board: Array(ROWS).fill().map(() => Array(COLUMNS).fill(0)),
    currentPlayer: 1, // 1 for human, -1 for AI
    gameOver: false,
    lastMove: { row: -1, col: -1 }
};

let turnText;

function preload() {
    // We'll load our game assets here
}

function updateTurnText() {
    if (gameState.gameOver) {
        const winner = gameState.currentPlayer === 1 ? 'Red' : 'Yellow';
        turnText.setText(`Game Over! ${winner} wins!`).setColor(COLORS.TEXT);
    } else {
        const playerColor = gameState.currentPlayer === 1 ? COLORS.RED_PLAYER : COLORS.YELLOW_PLAYER;
        const playerName = gameState.currentPlayer === 1 ? 'Red' : 'Yellow';
        turnText.setText(`Current Turn: ${playerName}`).setColor(playerColor);
    }
}

function getColumnFromX(x) {
    return Math.floor((x - BOARD_OFFSET_X) / (SLOT_SIZE + SLOT_PADDING));
}

function isValidColumn(col) {
    return col >= 0 && col < COLUMNS;
}

function getNextEmptyRow(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameState.board[row][col] === 0) {
            return row;
        }
    }
    return -1; // Column is full
}

function placeTile(scene, col) {
    if (gameState.gameOver) return;

    const row = getNextEmptyRow(col);
    if (row === -1) return; // Column is full

    // Update game state
    gameState.board[row][col] = gameState.currentPlayer;
    gameState.lastMove = { row, col };

    // Draw the tile
    const x = BOARD_OFFSET_X + col * (SLOT_SIZE + SLOT_PADDING);
    const y = BOARD_OFFSET_Y + row * (SLOT_SIZE + SLOT_PADDING);

    createTile(scene, x, y, gameState.currentPlayer);
}

function create() {
    createBoard(this);
    turnText = createTurnText(this);
    updateTurnText();

    // Add click handler for the board (only for human player)
    this.input.on('pointerdown', (pointer) => {
        if (gameState.currentPlayer === 1 && !gameState.gameOver) {
            const col = getColumnFromX(pointer.x);
            if (isValidColumn(col)) {
                placeTile(this, col);
            }
        }
    });
}

function update() {
    if (gameState.gameOver) return;

    // Check if a move was made
    if (gameState.lastMove.row !== -1) {
        // Check for win or draw
        if (checkWin(gameState.board, gameState.lastMove.row, gameState.lastMove.col, gameState.currentPlayer)) {
            gameState.gameOver = true;
        } else if (isBoardFull(gameState.board)) {
            gameState.gameOver = true;
            turnText.setText('Game Over! It\'s a draw!').setColor(COLORS.TEXT);
            return;
        }

        // Switch players if game is not over
        if (!gameState.gameOver) {
            gameState.currentPlayer = -gameState.currentPlayer; // Switch between 1 and -1
            updateTurnText();
            gameState.lastMove = { row: -1, col: -1 }; // Reset last move

            // If it's AI's turn, make a move
            if (gameState.currentPlayer === -1) {
                const aiMove = getAIMove(gameState.board);
                if (aiMove !== -1) {
                    this.time.delayedCall(500, () => {
                        placeTile(this, aiMove);
                    });
                }
            }
        } else {
            updateTurnText();
        }
    }
}

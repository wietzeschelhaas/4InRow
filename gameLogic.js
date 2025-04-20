import { COLUMNS, ROWS } from './constants.js';

export function checkWin(board, row, col, player) {
    // Check horizontal
    let count = 0;
    // Check 3 positions to the left and right of the current position
    const startCol = Math.max(0, col - 3);
    const endCol = Math.min(COLUMNS - 1, col + 3);
    for (let c = startCol; c <= endCol; c++) {
        count = board[row][c] === player ? count + 1 : 0;
        if (count >= 4) return true;
    }

    // Check vertical
    count = 0;
    // Check 3 positions up and down from the current position
    const startRow = Math.max(0, row - 3);
    const endRow = Math.min(ROWS - 1, row + 3);
    for (let r = startRow; r <= endRow; r++) {
        count = board[r][col] === player ? count + 1 : 0;
        if (count >= 4) return true;
    }

    // Check diagonal (top-left to bottom-right)
    count = 0;
    // Start 3 positions up-left from current position
    let r = row - 3;
    let c = col - 3;
    while (r <= row + 3 && c <= col + 3) {
        if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS) {
            count = board[r][c] === player ? count + 1 : 0;
            if (count >= 4) return true;
        }
        r++;
        c++;
    }

    // Check diagonal (top-right to bottom-left)
    count = 0;
    // Start 3 positions up-right from current position
    r = row - 3;
    c = col + 3;
    while (r <= row + 3 && c >= col - 3) {
        if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS) {
            count = board[r][c] === player ? count + 1 : 0;
            if (count >= 4) return true;
        }
        r++;
        c--;
    }

    return false;
}

export function isBoardFull(board) {
    return board[0].every(cell => cell !== 0);
}

export function getValidColumns(board) {
    const validColumns = [];
    for (let col = 0; col < COLUMNS; col++) {
        if (board[0][col] === 0) { // If top row is empty, column is valid
            validColumns.push(col);
        }
    }
    return validColumns;
}

export function getAIMove(board) {
    const validColumns = getValidColumns(board);
    if (validColumns.length === 0) return -1;

    let bestScore = -Infinity;
    let bestColumn = validColumns[0];

    for (const col of validColumns) {
        const row = getNextEmptyRow(board, col);
        //Make the move
        board[row][col] = -1;

        const score = minimax(board, 0, 1);

        console.log(`Column ${col}:`, {
            score: score,
        });

        if (score > bestScore) {
            bestScore = score;
            bestColumn = col;
        }

        //undo the move
        board[row][col] = 0;
    }

    console.log('Best column:', bestColumn, 'with score:', bestScore);
    return bestColumn;
}

function minimax(board, depth, player) {
    // Check for terminal states first
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (board[row][col] !== 0) {
                if (checkWin(board, row, col, board[row][col])) {
                    // AI wins should be positive, human wins should be negative
                    return board[row][col] === -1 ? 1000 : -1000;
                }
            }
        }
    }

    if (depth === 5) {
        return evaluatePosition(board);
    }

    // if human player (minimizing)
    if (player === 1) {
        let bestScore = Infinity;
        const validColumns = getValidColumns(board);
        for (const col of validColumns) {
            const row = getNextEmptyRow(board, col);
            board[row][col] = player;
            const score = minimax(board, depth + 1, -1);
            bestScore = Math.min(score, bestScore);
            board[row][col] = 0;
        }
        return bestScore;
    }

    // if AI player (maximizing)
    if (player === -1) {
        let bestScore = -Infinity;
        const validColumns = getValidColumns(board);
        for (const col of validColumns) {
            const row = getNextEmptyRow(board, col);
            board[row][col] = player;
            const score = minimax(board, depth + 1, 1);
            bestScore = Math.max(score, bestScore);
            board[row][col] = 0;
        }
        return bestScore;
    }
}

function getNextEmptyRow(board, col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            return row;
        }
    }
}

function evaluateBoardForPlayer(board, player) {
    let score = 0;
    const WINNING_LENGTH = 4;  // Connect 4
    const EMPTY = 0;

    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            for (const dir of directions) {
                let countPlayerPieces = 0;
                let countEmpty = 0;

                for (let i = 0; i < WINNING_LENGTH; i++) {
                    const newRow = row + dir[0] * i;
                    const newCol = col + dir[1] * i;

                    if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLUMNS) {
                        if (board[newRow][newCol] === player) {
                            countPlayerPieces++;
                        } else if (board[newRow][newCol] === EMPTY) {
                            countEmpty++;
                        }
                    }
                }

                if (countPlayerPieces + countEmpty === WINNING_LENGTH) {
                    let initialScore = (WINNING_LENGTH * 10) + 10;
                    for (let i = 1; i < WINNING_LENGTH; i++) {
                        if (countPlayerPieces === WINNING_LENGTH - i) {
                            score += Math.floor(initialScore / i);
                            initialScore = initialScore - 10;
                        }
                    }
                }
            }
        }
    }
    return score;
}

function evaluatePosition(board) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (board[row][col] !== 0) {
                if (checkWin(board, row, col, board[row][col])) {
                    return board[row][col] === -1 ? 1000 : -1000;
                }
            }
        }
    }

    const humanScore = evaluateBoardForPlayer(board, 1);
    const aiScore = evaluateBoardForPlayer(board, -1);

    return aiScore - humanScore;
}

export function printBoard(board) {
    console.log('\nCurrent Board State:');
    console.log('-------------------');

    console.log('   ' + Array.from({ length: COLUMNS }, (_, i) => i).join('  '));

    for (let row = 0; row < ROWS; row++) {
        let rowStr = row + ' |';
        for (let col = 0; col < COLUMNS; col++) {
            const cell = board[row][col];
            let symbol;
            if (cell === 0) {
                symbol = '.';
            } else {
                symbol = cell.toString();
            }
            rowStr += ' ' + symbol + ' ';
        }
        console.log(rowStr);
    }
    console.log('-------------------\n');
}
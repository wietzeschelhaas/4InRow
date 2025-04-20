import { COLORS, COLUMNS, ROWS, SLOT_SIZE, SLOT_PADDING, BOARD_OFFSET_X, BOARD_OFFSET_Y } from './constants.js';

export function createBoard(scene) {
    const boardWidth = COLUMNS * (SLOT_SIZE + SLOT_PADDING) - SLOT_PADDING;
    const boardHeight = ROWS * (SLOT_SIZE + SLOT_PADDING) - SLOT_PADDING;
    
    // Draw the board background
    const board = scene.add.graphics();
    board.fillStyle(Phaser.Display.Color.HexStringToColor(COLORS.BOARD).color, 1);
    board.fillRoundedRect(
        BOARD_OFFSET_X - SLOT_PADDING,
        BOARD_OFFSET_Y - SLOT_PADDING,
        boardWidth + 2 * SLOT_PADDING,
        boardHeight + 2 * SLOT_PADDING,
        10
    );

    // Create the slots
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const x = BOARD_OFFSET_X + col * (SLOT_SIZE + SLOT_PADDING);
            const y = BOARD_OFFSET_Y + row * (SLOT_SIZE + SLOT_PADDING);
            
            // Draw the slot
            const slot = scene.add.graphics();
            slot.fillStyle(Phaser.Display.Color.HexStringToColor(COLORS.SLOT).color, 1);
            slot.fillCircle(x + SLOT_SIZE/2, y + SLOT_SIZE/2, SLOT_SIZE/2 - 2);
        }
    }
}

export function createTurnText(scene) {
    const turnText = scene.add.text(500, 50, '', {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: COLORS.TEXT
    }).setOrigin(0.5);
    return turnText;
}

export function createTile(scene, x, y, player) {
    const tile = scene.add.graphics();
    const tileColor = player === 1 ? COLORS.RED_PLAYER : COLORS.YELLOW_PLAYER;
    tile.fillStyle(Phaser.Display.Color.HexStringToColor(tileColor).color, 1);
    tile.fillCircle(x + SLOT_SIZE/2, y + SLOT_SIZE/2, SLOT_SIZE/2 - 2);
    return tile;
} 

import { Grid } from './game/services/Grid.js';
import { GRID_WIDTH, GRID_HEIGHT, TILE_WIDTH, TILE_HEIGHT } from './game/constants/gridConfig.js';
import MenuScene from './game/scenes/MenuScene.js';
import GameScene from './game/scenes/GameScene.js';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.grid = null;
    }

    preload() {
        // Usando um sprite básico como tile
        this.load.image('tile', 'https://labs.phaser.io/assets/sprites/block.png');
    }

    create() {
        this.grid = new Grid(this, GRID_WIDTH, GRID_HEIGHT);
        
        // Centralizar a câmera
        const centerX = (GRID_WIDTH * TILE_WIDTH) / 2;
        const centerY = (GRID_HEIGHT * TILE_HEIGHT) / 2;
        this.cameras.main.centerOn(centerX, centerY);

        // Desenhar grid inicial
        this.drawGrid();

        // Adicionar interatividade
        this.input.on('pointerdown', (pointer) => {
            const pos = this.grid.isometricToCartesian(
                pointer.x - centerX,
                pointer.y - centerY
            );
            console.log('Clicked tile:', pos);
        });
    }

    drawGrid() {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const pos = this.grid.cartesianToIsometric(x, y);
                const tile = this.add.rectangle(
                    pos.x,
                    pos.y,
                    TILE_WIDTH,
                    TILE_HEIGHT,
                    0x00ff00,
                    0.5
                );
                tile.setStrokeStyle(1, 0x000000);
                this.grid.setTileAt(x, y, tile);
            }
        }
    }

    update() {
        // Lógica de atualização do jogo
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#87CEEB', // Céu azul
    scene: [MenuScene, GameScene, MainScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        autoRound: true,
        min: {
            width: 320,
            height: 240
        },
        max: {
            width: 1920,
            height: 1080
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

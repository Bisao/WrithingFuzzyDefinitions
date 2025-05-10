
import { Grid } from '../services/Grid.js';
import { GRID_WIDTH, GRID_HEIGHT, TILE_WIDTH, TILE_HEIGHT } from '../constants/gridConfig.js';
import { NPC } from '../entities/NPC.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.grid = null;
        this.player = null;
    }

    preload() {
        // Carregar assets temporários
        this.load.image('tiles', 'https://labs.phaser.io/assets/tilemaps/tiles/grass-tiles-2-small.png');
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/mushroom2.png');
        this.load.image('plant', 'https://labs.phaser.io/assets/sprites/flower-purple.png');
        this.load.image('npc', 'https://labs.phaser.io/assets/sprites/mushroom.png');
    }

    create() {
        this.grid = new Grid(this, GRID_WIDTH, GRID_HEIGHT);
        
        // Criar o grid de fazenda
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const pos = this.grid.cartesianToIsometric(x, y);
                const tile = this.add.image(pos.x + 400, pos.y + 100, 'tiles');
                tile.setInteractive();
                tile.on('pointerdown', () => this.onTileClick(x, y));
                this.grid.setTileAt(x, y, { sprite: tile, planted: false });
            }
        }

        // Adicionar jogador
        const startPos = this.grid.cartesianToIsometric(5, 5);
        this.player = this.add.sprite(startPos.x + 400, startPos.y + 100, 'player');
        this.player.setScale(0.5);

        // Interface básica
        this.add.text(10, 10, 'Dinheiro: $100', { fontSize: '24px', fill: '#fff' });

        // Criar NPC
        this.npc = new NPC(this, 10, 10);
        
        // Botão de menu
        const menuButton = this.add.text(700, 10, 'Menu', {
            fontSize: '24px',
            backgroundColor: '#2ecc71',
            padding: { x: 10, y: 5 },
            fill: '#fff'
        })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('MenuScene'));
    }

    onTileClick(x, y) {
        const tile = this.grid.getTileAt(x, y);
        if (tile && !tile.planted) {
            const pos = this.grid.cartesianToIsometric(x, y);
            this.add.image(pos.x + 400, pos.y + 100, 'plant').setScale(0.5);
            tile.planted = true;
        }
    }

    update() {
        // Lógica de atualização do jogo
    }
}

export default GameScene;

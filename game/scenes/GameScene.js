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
        
        // Configurar input para mobile
        this.input.addPointer(2); // Suporte para multitouch
        this.scale.lockOrientation('landscape'); // Forçar modo paisagem

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

        // Interface básica ajustável com posicionamento responsivo
        const fontSize = Math.min(Math.max(this.scale.width * 0.03, 16), 24);
        const margin = Math.min(Math.max(this.scale.width * 0.02, 10), 20);
        
        // Ajuste do texto de dinheiro para ser sempre visível
        const moneyText = this.add.text(margin, margin, 'Dinheiro: $100', { 
            fontSize: `${fontSize}px`, 
            fill: '#fff' 
        });
        moneyText.setScrollFactor(0);

        // Botão de menu responsivo sempre visível
        const menuButton = this.add.text(this.scale.width - margin * 4, margin, 'Menu', {
            fontSize: `${fontSize}px`,
            backgroundColor: '#2ecc71',
            padding: { x: 10, y: 5 },
            fill: '#fff'
        })
        .setScrollFactor(0)
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
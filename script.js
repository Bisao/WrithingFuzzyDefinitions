
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Aqui carregaremos os assets posteriormente
    }

    create() {
        this.add.text(400, 300, 'Farm Game', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);
    }

    update() {
        // Lógica de atualização do jogo
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1a1a1a',
    scene: MainScene,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
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

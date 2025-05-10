
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Carregar background de fazenda
        this.load.image('bg', 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/pics/countryside-platform.png');
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Background
        this.add.image(centerX, centerY, 'bg').setDisplaySize(800, 600);

        // Container para animação
        const container = this.add.container(centerX, centerY);

        // Título com efeito de sombra
        const title = this.add.text(0, -120, 'Farm Game', {
            fontSize: '72px',
            fill: '#2c4a1d',
            fontStyle: 'bold',
            stroke: '#769c4a',
            strokeThickness: 6
        }).setOrigin(0.5);
        container.add(title);

        // Botão Play estilizado
        const playButton = this.add.text(0, 20, 'Play', {
            fontSize: '36px',
            fill: '#ffffff',
            backgroundColor: '#2ecc71',
            padding: { x: 30, y: 15 },
            borderRadius: 15
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true });
        container.add(playButton);

        // Botão Settings estilizado
        const settingsButton = this.add.text(0, 100, 'Settings', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#3498db',
            padding: { x: 25, y: 12 },
            borderRadius: 15
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true });
        container.add(settingsButton);

        // Eventos dos botões
        playButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('MainScene');
            });
        });

        settingsButton.on('pointerdown', () => {
            console.log('Settings clicked');
        });

        // Efeitos de hover aprimorados
        [playButton, settingsButton].forEach(button => {
            button.on('pointerover', () => {
                this.tweens.add({
                    targets: button,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 100
                });
            });
            
            button.on('pointerout', () => {
                this.tweens.add({
                    targets: button,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100
                });
            });
        });

        // Animação de entrada
        container.setAlpha(0);
        container.setScale(0.8);
        this.tweens.add({
            targets: container,
            alpha: 1,
            scale: 1,
            duration: 1000,
            ease: 'Back.easeOut'
        });
    }
}

export default MenuScene;

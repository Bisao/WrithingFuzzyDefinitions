
import { Scene } from 'phaser';

export class MenuScene extends Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Título
        this.add.text(centerX, centerY - 100, 'Farm Game', {
            fontSize: '64px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Botão Play
        const playButton = this.add.text(centerX, centerY + 20, 'Play', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#4a8',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        // Botão Settings
        const settingsButton = this.add.text(centerX, centerY + 100, 'Settings', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#48a',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        // Eventos dos botões
        playButton.on('pointerdown', () => {
            this.scene.start('MainScene');
        });

        settingsButton.on('pointerdown', () => {
            // Será implementado posteriormente
            console.log('Settings clicked');
        });

        // Efeitos de hover
        [playButton, settingsButton].forEach(button => {
            button.on('pointerover', () => {
                button.setScale(1.1);
            });
            
            button.on('pointerout', () => {
                button.setScale(1);
            });
        });
    }
}

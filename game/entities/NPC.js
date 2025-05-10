
import { eventManager } from '../services/EventManager.js';

export class NPC {
    constructor(scene, x, y) {
        try {
            this.scene = scene;
            this.gridX = x;
            this.gridY = y;
            this.moving = false;
            this.moveTimer = null;
            this.initialize();
        } catch (error) {
            console.error('Erro ao criar NPC:', error);
            throw error;
        }
    }

    initialize() {
        try {
            const pos = this.scene.grid.cartesianToIsometric(this.gridX, this.gridY);
            this.sprite = this.scene.add.sprite(pos.x + 400, pos.y + 100, 'npc');
            this.sprite.setScale(0.5);
            this.startMoving();
            
            eventManager.emit('npc:created', { x: this.gridX, y: this.gridY });
        } catch (error) {
            console.error('Erro ao inicializar NPC:', error);
            throw error;
        }
    }

    startMoving() {
        try {
            this.moveTimer = this.scene.time.addEvent({
                delay: 2000,
                callback: this.moveRandomly,
                callbackScope: this,
                loop: true
            });
        } catch (error) {
            console.error('Erro ao iniciar movimento do NPC:', error);
        }
    }

    moveRandomly() {
        if (this.moving) return;

        try {
            const directions = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ];

            const randomDir = Phaser.Math.RND.pick(directions);
            const newX = this.gridX + randomDir.x;
            const newY = this.gridY + randomDir.y;

            if (this.isValidPosition(newX, newY)) {
                this.move(newX, newY);
            }
        } catch (error) {
            console.error('Erro durante movimento do NPC:', error);
        }
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.scene.grid.width &&
               y >= 0 && y < this.scene.grid.height;
    }

    move(newX, newY) {
        try {
            this.moving = true;
            const newPos = this.scene.grid.cartesianToIsometric(newX, newY);
            
            this.scene.tweens.add({
                targets: this.sprite,
                x: newPos.x + 400,
                y: newPos.y + 100,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.gridX = newX;
                    this.gridY = newY;
                    this.moving = false;
                    eventManager.emit('npc:moved', { x: newX, y: newY });
                }
            });
        } catch (error) {
            console.error('Erro ao mover NPC:', error);
            this.moving = false;
        }
    }

    destroy() {
        try {
            if (this.moveTimer) {
                this.moveTimer.destroy();
            }
            this.sprite.destroy();
            eventManager.emit('npc:destroyed', { x: this.gridX, y: this.gridY });
        } catch (error) {
            console.error('Erro ao destruir NPC:', error);
        }
    }
}

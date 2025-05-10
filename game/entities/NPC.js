
export class NPC {
    constructor(scene, x, y) {
        this.scene = scene;
        const pos = scene.grid.cartesianToIsometric(x, y);
        this.sprite = scene.add.sprite(pos.x + 400, pos.y + 100, 'npc');
        this.sprite.setScale(0.5);
        
        this.gridX = x;
        this.gridY = y;
        this.moving = false;
        this.moveTimer = null;
        
        this.startMoving();
    }

    startMoving() {
        this.moveTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: this.moveRandomly,
            callbackScope: this,
            loop: true
        });
    }

    moveRandomly() {
        if (this.moving) return;

        const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];

        const randomDir = Phaser.Math.RND.pick(directions);
        const newX = this.gridX + randomDir.x;
        const newY = this.gridY + randomDir.y;

        if (newX >= 0 && newX < this.scene.grid.width &&
            newY >= 0 && newY < this.scene.grid.height) {
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
                }
            });
        }
    }

    destroy() {
        if (this.moveTimer) {
            this.moveTimer.destroy();
        }
        this.sprite.destroy();
    }
}

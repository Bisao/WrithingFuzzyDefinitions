
export class TutorialSystem {
    private scene: Phaser.Scene;
    private steps: string[];
    private currentStep: number = 0;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.steps = [
            'Bem-vindo à sua fazenda! Clique em um terreno para começar.',
            'Use sementes para plantar culturas.',
            'Aguarde as plantas crescerem e colha!'
        ];
    }

    start(): void {
        this.showCurrentStep();
    }

    private showCurrentStep(): void {
        if (this.currentStep < this.steps.length) {
            const text = this.scene.add.text(10, this.scene.scale.height - 50, 
                this.steps[this.currentStep], 
                { fontSize: '18px', backgroundColor: '#000', padding: { x: 10, y: 5 } }
            );
            text.setScrollFactor(0);

            this.scene.time.delayedCall(5000, () => {
                text.destroy();
                this.currentStep++;
                this.showCurrentStep();
            });
        }
    }
}

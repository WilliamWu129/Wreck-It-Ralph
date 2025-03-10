class StageCleared extends Phaser.Scene {
    constructor() {
        super("StageCleared");
    }

    create() {
        this.add.text(300, 200, 'Stage Cleared!', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        let menuButton = this.add.text(300, 300, 'Return to Menu', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            backgroundColor: '#000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive();

        menuButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });

        menuButton.on('pointerover', () => {
            menuButton.setStyle({ fill: '#ff0' });
        });

        menuButton.on('pointerout', () => {
            menuButton.setStyle({ fill: '#fff' });
        });
    }
}
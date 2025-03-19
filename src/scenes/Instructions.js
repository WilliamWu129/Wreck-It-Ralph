class Instructions extends Phaser.Scene {
    constructor() {
        super("Instructions");
    }

    create(data) {
        this.add.text(300, 200, 'Instructions', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(150, 250, 'Arrow keys to move and Space to Jump', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);
        
        this.add.text(250, 300, 'F is hammer', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);
        
        
        this.add.text(200, 350, 'Click M for To return to Menu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);


        let menuButton = this.add.text(300, 400, 'Return to Menu', {
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
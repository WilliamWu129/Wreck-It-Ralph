class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    create(data) {
        this.add.text(300, 200, 'Credits', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(250, 250, 'Made By William Wu ', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);
        
        this.add.text(250, 300, 'Assets - William Wu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);
        
        
        this.add.text(250, 350, 'Sounds - William Wu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);

        this.add.text(200, 400, '& PixaBay.com(videogame music)', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);


        let menuButton = this.add.text(300, 450, 'Return to Menu', {
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
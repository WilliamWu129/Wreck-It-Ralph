class Menu extends Phaser.Scene {
    constructor(){
        super("Menu")
    }

    preload(){

    }


    create(){
        this.add.text(300, 200, 'Wreck-It Ralph', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Add play button as text
        let playButton = this.add.text(300, 300, 'Play', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            backgroundColor: '#000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive();

        // Add event listener for play button
        playButton.on('pointerdown', () => {
            this.scene.start('PlayScene'); 
        });

        // Hover effect
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#ff0' }); // Change text color on hover
        });

        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#fff' }); // Revert text color
        });


        this.add.text(130, 400, 'arrow keys to move, Jump is Space, F is hammer', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);
        
        this.add.text(200, 450, 'to return to menu click M', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.2);

    }

    update(){

    }
}

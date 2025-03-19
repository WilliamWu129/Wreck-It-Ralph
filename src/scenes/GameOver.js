class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create(data) {
        this.add.text(300, 200, 'Game Over', {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const finalScore = data?.score || 0;

        let highScore = localStorage.getItem("highScore") || 0;
        highScore = Math.max(highScore, finalScore);
        localStorage.setItem("highScore", highScore);


        this.add.text(300, 275, `Current Score: ${finalScore}`, {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        this.add.text(300, 320, `High Score: ${highScore}`, {
            fontSize: '28px',
            fill: '#ffff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


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
        
        this.events.once('shutdown', () => {
            const playScene = this.scene.get("PlayScene");
            if (playScene) {
                playScene.score = 0;  // Resets score AFTER displaying it
            }
        });
    }
}
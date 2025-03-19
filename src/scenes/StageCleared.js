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

        let nextLevelButton = this.add.text(300, 270, 'Next Level', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            backgroundColor: '#008000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive();


        const playScene = this.scene.get("PlayScene");
        const currentScore = playScene ? playScene.score : 0;

        // Retrieve the saved high score from local storage
        let highScore = localStorage.getItem("highScore") || 0;
        highScore = Math.max(highScore, currentScore);  // Update high score if needed

        // Save new high score if it's higher
        localStorage.setItem("highScore", highScore);


        this.add.text(300, 320, `Current Score: ${currentScore}`, {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Display high score
        this.add.text(300, 360, `High Score: ${highScore}`, {
            fontSize: '28px',
            fill: '#ffff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        nextLevelButton.on('pointerdown', () => {
            const nextStage = this.scene.get("PlayScene").currentStage + 1;
            this.scene.stop("StageCleared");  // Stop this scene
            this.scene.start("PlayScene", { stageNumber: nextStage });  // Start next stage
        });

        nextLevelButton.on('pointerover', () => {
            nextLevelButton.setStyle({ backgroundColor: '#00AA00' });
        });

        nextLevelButton.on('pointerout', () => {
            nextLevelButton.setStyle({ backgroundColor: '#008000' });
        });

        let menuButton = this.add.text(300, 500, 'Return to Menu', {
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
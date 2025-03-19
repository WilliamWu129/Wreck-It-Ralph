class Menu extends Phaser.Scene {
    constructor(){
        super("Menu")
    }

    preload(){
        this.load.audio('bgMusic', 'assets/BackgroundMusic.mp3');
        this.load.image('spark', 'assets/spark.png');//play button animation spark
    }


    create(){
        if (!this.sound.get('bgMusic')) {
            this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.1 });  
            this.bgMusic.play();
        }

        let particles = this.add.particles(0, 0, 'spark', {
            speed: 20,
            lifespan: 400,
            scale: { start: 0.2, end: 0 },
            quantity: 2,
            emitting: false
        });

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
            particles.setPosition(playButton.x, playButton.y + 10); 
            particles.start();
            playButton.setStyle({ fill: '#ff0' }); // Change text color on hover
        });

        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#fff' }); // Revert text color
            particles.stop();
        });


        let InstructionsButton = this.add.text(300, 400, 'Instructions', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            backgroundColor: '#000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive();

        InstructionsButton.on('pointerdown', () => {
            this.scene.start('Instructions'); 
        });

        let CreditsButton = this.add.text(300, 500, 'Credits', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial',
            backgroundColor: '#000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive();

        CreditsButton.on('pointerdown', () => {
            this.scene.start('Credits'); 
        });


       
    }

    update(){

    }
}

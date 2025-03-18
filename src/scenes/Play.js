class PlayScene extends Phaser.Scene {
    constructor() {
        super("PlayScene");
    }

    preload() {
        this.load.spritesheet('felix', 'assets/Felix.png', { frameWidth: 70, frameHeight: 70 });
        
        this.load.image('background', 'assets/background.png');
        this.load.image('transparent', 'assets/transparent.png');
        this.load.image('life', 'assets/lives.png');
        this.load.image('cake', 'assets/cake.png');  



        this.load.spritesheet('brokenWin', 'assets/brokenWin.png',{
            frameWidth: 200,
            frameHeight: 200
        });

        
        this.load.spritesheet('brick', 'assets/brick.png',{
            frameWidth: 60,
            frameHeight: 60
        });


        this.load.spritesheet('ralph', 'assets/Ralph.png', {
            frameWidth: 300,  
            frameHeight: 300
        });
        
        this.load.audio('hurt', 'assets/hurt.wav');
        this.load.audio('jump', 'assets/jump.wav');
        this.load.audio('fixWin', 'assets/fixWin.wav');
        
    }

    create() {
        this.add.image(300, 300, 'background');

        //audio
        this.hurtSound = this.sound.add('hurt');
        this.jumpSound = this.sound.add('jump');
        this.fixWinSound = this.sound.add('fixWin');
        
        this.livesRemaining = 3;  

        this.livesGroup = this.add.group();

        //  initial lives in the top right corner
        for (let i = 0; i < this.livesRemaining; i++) {
            const life = this.add.image(500 + i * 30, 30, 'life');  
            life.setScale(0.5);  
            this.livesGroup.add(life);
        }

        //scoring
        this.score =0;
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            backgroundColor: '#000000'
        });

        //ralph
        this.ralph = new Ralph(this, 300, 130);
        this.add.existing(this.ralph);
        this.physics.add.existing(this.ralph);


        this.platforms = this.physics.add.staticGroup();

        //animations
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'felix', frame: 0 }],
            frameRate: 10
        });
        
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('felix', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'felix', frame: 5 }],
            frameRate: 10
        });
        
        this.anims.create({
            key: 'hammer',
            frames: [{ key: 'felix', frame: 4 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'felix-powerup',
            frames: this.anims.generateFrameNumbers('felix', { start: 8, end: 10 }),
            frameRate: 10,
            repeat: -1  // Loop the animation while powered up
        });

        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('felix', { start: 11, end: 12 }),
            frameRate: 10,
        });

        //broken windows
        this.brokenWindows = this.physics.add.staticGroup();

        const allWindowPositions  = [
            { x: 165, y: 495 }, 
            { x: 165, y: 415 },
            { x: 165, y: 317 }, 
            { x: 165, y: 237 }, 

            
            { x: 232, y: 235 },
            { x: 232, y: 315 },
            { x: 232, y: 413 },
            { x: 232, y: 495 },

            
            { x: 298, y: 231 },
            { x: 298, y: 315 }, 


            { x: 360, y: 493 },
            { x: 362, y: 413 },
            { x: 365, y: 235 },
            { x: 365, y: 315 },



            { x: 430, y: 493 },
            { x: 430, y: 412 },
            { x: 430, y: 315 },
            { x: 430, y: 235 },


        ];

        Phaser.Utils.Array.Shuffle(allWindowPositions);
        const selectedPositions = allWindowPositions.slice(0, 9);


        for (let pos of selectedPositions) {
            const frame = Phaser.Math.Between(0, 3);  // Choose a random broken window style
            const brokenWindow = this.brokenWindows.create(pos.x, pos.y, 'brokenWin', frame);
            brokenWindow.setScale(0.5);
            brokenWindow.body.setSize(50, 50); 
            brokenWindow.body.setOffset(71, 71);
        }

        this.windowsRemaining = selectedPositions.length;
        console.log(`Spawned ${this.windowsRemaining} broken windows.`);


        


        let platforms = [
            { x: 162, y: 518 }, 
            { x: 162, y: 438 }, 
            { x: 162, y: 260 }, 
            { x: 162, y: 340 }, 

            { x: 232, y: 340 }, //x is 2nd row
            { x: 232, y: 260 },
            { x: 232, y: 438 }, // y is 2nd lvl
            { x: 232, y: 518 },
            
            { x: 298, y: 340 }, //y is 4th lvl
            { x: 298, y: 260 }, // y is 3rd lvl 

            { x: 360, y: 518 },
            { x: 362, y: 438 },
            { x: 365, y: 260 },
            { x: 365, y: 340 },

            { x: 430, y: 518 },
            { x: 430, y: 438 },
            { x: 430, y: 260 },
            { x: 430, y: 340 },



            // Add all pairs here
        ];
        
        for (let platform of platforms) {
            let p = this.platforms.create(platform.x, platform.y, 'transparent').setScale(10, 1).refreshBody();
        
            // Make platform one-way
            p.body.checkCollision.down = false;
            p.body.checkCollision.left = false;
            p.body.checkCollision.right = false; 
        }
        
        this.cake = null;  //cake one exists at a time
        this.startCakeSpawnTimer();

        this.felix = new Felix(this, 650, 500);
        this.physics.add.existing(this.felix);

        this.physics.add.collider(this.felix, this.platforms);
        this.menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }

    update(time, delta) {
        this.felix.update();


        this.ralph.update(time, delta);
        if (Phaser.Input.Keyboard.JustDown(this.menuKey)) {
            console.log("Returning to Menu...");
            this.scene.start("Menu");  
        }
    }

    updateScoreText() {
        this.scoreText.setText('Score: ' + this.score);
    }

    loseLife() {
        this.livesRemaining--;
    
        // Remove one life icon from the group
        if (this.livesGroup.getChildren().length > 0) {
            const life = this.livesGroup.getChildren()[this.livesGroup.getChildren().length - 1];
            life.destroy();
        }
    
        // Check for Game Over
        if (this.livesRemaining <= 0) {
            this.gameOver();
        }
    }


    startCakeSpawnTimer() {
        this.time.addEvent({
            delay: 10000,  //Spawns every 10 seconds
            callback: this.spawnCake,
            callbackScope: this,
            loop: true
        });
    }

    spawnCake() {
        if (this.cake) return;  //Do nothing if a cake already exists
    
        const randomPlatform = Phaser.Utils.Array.GetRandom(this.platforms.getChildren());
        const { x, y } = randomPlatform;
    
        this.cake = new Cake(this, x, y - 10);  // Spawn cake slightly above the platform
    }

    collectCake() {
        console.log("Cake collected!");
        this.cake = null;  // Remove the cake
        

        this.felix.setVelocity(0, 0);
        this.felix.body.allowGravity = false;
        this.felix.isEating = true; 

        this.felix.anims.play('eat', true);

        this.time.delayedCall(1000, () => {
            this.startPowerUp();
            this.felix.isEating = false; 
        });
    }

    startPowerUp() {
        console.log("Power-Up Activated!");
        
 
        this.felix.isPoweredUp = true;
        this.felix.anims.play('felix-powerup', true);
    
        //doesnt work at the moment////////////////////////////////////
        this.physics.world.removeCollider(this.brickCollision);
    
        //  Disable Top Collision on Platforms
        this.platforms.getChildren().forEach((platform) => {
            platform.body.checkCollision.up = false;
        });
    
        this.felix.powerUpControls = this.input.keyboard.createCursorKeys();
    
        //  Set Timer 5 Seconds
        this.time.delayedCall(5000, () => {
            this.endPowerUp();
        });
    }

    
    endPowerUp() {
        console.log("Power-up ended!");
        this.felix.body.allowGravity = true;  //  Re-enable gravity
        this.felix.isPoweredUp = false;  //  Reset power-up state
        this.felix.setVelocity(0, 0);  // Stop movement
    
        // Restore normal Felix animation
        this.felix.anims.play('idle', true);

        this.platforms.getChildren().forEach((platform) => {
            platform.body.checkCollision.up = true;
        });
    
        //  Re-enable brick collisions
        this.brickCollision = this.physics.add.collider(this.felix, this.bricks, () => {
            this.felix.takeDamage();
        });
    }
    
    
    
    gameOver() {
        console.log("Game Over!");
        this.scene.start("Menu");  
    }



}

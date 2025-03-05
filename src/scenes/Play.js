class PlayScene extends Phaser.Scene {
    constructor() {
        super("PlayScene");
    }

    preload() {
        this.load.spritesheet('felix', 'assets/Felix.png', { frameWidth: 70, frameHeight: 70 });
        this.load.image('background', 'assets/background.png');
        this.load.image('transparent', 'assets/transparent.png');

        this.load.spritesheet('ralph', 'assets/Ralph.png', {
            frameWidth: 300,  
            frameHeight: 300
        });
        
        
    }

    create() {
        this.add.image(300, 300, 'background');

        //ralph
        this.ralph = new Ralph(this, 300, 100);
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
            frameRate: 10
        });
        


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
        
        

        this.ladders = this.physics.add.staticGroup();

    

        this.felix = new Felix(this, 650, 500);
        this.physics.add.existing(this.felix);

        this.physics.add.collider(this.felix, this.platforms);
        this.physics.add.overlap(this.felix, this.ladders, this.handleLadder, null, this);
    }

    update() {
        this.felix.update();

        if (!this.physics.overlap(this.felix, this.ladders) && this.felix.isClimbing) {
            this.felix.stopClimbing();
        }

        this.ralph.update();
        
    }

    handleLadder(felix, ladder) {
        if (this.input.keyboard.createCursorKeys().up.isDown) {
            felix.setVelocityY(-100);
            felix.body.allowGravity = false;
        } else if (this.input.keyboard.createCursorKeys().down.isDown) {
            felix.setVelocityY(100);
            felix.body.allowGravity = false;
        } else {
            felix.setVelocityY(0);
        }

        this.physics.world.on('worldstep', () => {
            if (!felix.body.embedded && !felix.body.touching.none) {
                felix.body.allowGravity = true;
            }
        });
    }
}

class Ralph extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ralph');

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //sizing
        this.setScale(0.5);
        this.body.setSize(this.width * 0.5, this.height * 0.5);



        this.setVelocityX(50);

        this.createAnimations();
        this.play('ralph-walk');

        this.timeToAttack = 3000;  // Every 3 seconds
        this.lastAttackTime = 0;
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'ralph-walk',
            frames: this.scene.anims.generateFrameNumbers('ralph', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'ralph-windup',
            frames: [{ key: 'ralph', frame: 2 }],
            frameRate: 5
        });

        this.scene.anims.create({
            key: 'ralph-attack',
            frames: this.scene.anims.generateFrameNumbers('ralph', { start: 3, end: 6 }),
            frameRate: 8,
            repeat: 0
        });
    }

    update(time, delta) {
        if (this.x <= 170) {
            this.setVelocityX(50);
            this.setFlipX(false);
        } else if (this.x >= 420) {
            this.setVelocityX(-50);
            this.setFlipX(true);
        }

        if (time > this.lastAttackTime + this.timeToAttack && !this.isAttacking) {
            this.startAttack();
        }
    }

    startAttack() {
        this.isAttacking = true;  
        this.previousVelocityX = this.body.velocity.x;  // Store his movement speed
        this.setVelocityX(0);
    
        this.play('ralph-windup');
    
        this.scene.time.delayedCall(500, () => {
            let attackCount = 0;  // Counter for repeated attacks
    
            const repeatAttack = () => {
                if (attackCount < 4) {  // Change this number for more/less attacks
                    this.play('ralph-attack');
                    attackCount++;
    
                    //  Start spawning bricks **only during the first attack**
                    if (attackCount === 1) {
                        this.scene.time.delayedCall(300, () => {
                            this.spawnBricks();
                        });
                    }
    
                    //  Wait for the attack animation to finish, then repeat
                    this.scene.time.delayedCall(500, repeatAttack);
                } else {
                    //  After 4 attacks, resume walking
                    this.play('ralph-walk');
                    this.setVelocityX(this.previousVelocityX);
                    this.lastAttackTime = this.scene.time.now;
                    this.isAttacking = false;
                }
            };
    
            repeatAttack();  // Start attack loop
        });
    }
    

    spawnBricks() {
        for (let i = 0; i < 5; i++) {  // spawns 3 bricks with slight delays
            this.scene.time.delayedCall(i * 300, () => { 
                const offsetX = Phaser.Math.Between(-100, 100);  // Random horizontal offset
                const frame = Phaser.Math.Between(0, 2);  // Random brick frame
    
                const brick = this.scene.physics.add.sprite(this.x + offsetX, this.y + 50, 'brick');
                brick.setVelocityY(200);  
                brick.setFrame(frame);  


                brick.body.setSize(40, 30);  // Change size (width, height)

    
                this.scene.physics.add.overlap(brick, this.scene.felix, () => {
                    this.scene.felix.takeDamage();
                    brick.destroy();
                });
    
            });
        }
    }
    
}

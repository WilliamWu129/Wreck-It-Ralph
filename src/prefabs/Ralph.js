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
        
        this.previousVelocityX = this.body.velocity.x; //store his x velocity
        this.setVelocityX(0);
        
        this.play('ralph-windup');
    
        this.scene.time.delayedCall(500, () => {
            this.play('ralph-attack');
            
            this.scene.time.delayedCall(500, () => {
                this.spawnBricks();
                this.play('ralph-walk');
                this.setVelocityX(this.previousVelocityX);
    
                // Reset the attack timer only after the attack fully completes
                this.lastAttackTime = this.scene.time.now;
                this.isAttacking = false;  // Allows a new attack to start after this one finishes
            });
        });
    }

    spawnBricks() {

        
        for (let i = 0; i < 1; i++) {//can change later the amount of bricks spawning
            const offsetX = Phaser.Math.Between(-50, 50);  // Slight random x offset
            const brick = this.scene.physics.add.sprite(this.x + offsetX, this.y + 50, 'brick');
    
            brick.setVelocityY(200);  // Falls down at a constant speed
    
    
            this.scene.physics.add.overlap(brick, this.scene.felix, () => {
                this.scene.felix.takeDamage();
                brick.destroy();
            });
        }
    }
    
}

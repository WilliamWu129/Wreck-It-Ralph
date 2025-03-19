class Felix extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'felix');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setGravityY(1500);
        this.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.hammerKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.isJumping = false;
        this.isHammering = false;
        this.isClimbing = false;

        this.moveSpeed = 160;
        this.climbSpeed = 100;

        this.play('idle');

        this.setScale(0.8);
        this.body.setSize(this.width * 0.7, this.height * 0.9);
        this.body.setOffset(this.width * 0.05, this.height * 0.05);
    }

    update() {
        if (this.isEating) {
            this.setVelocity(0, 0);  // Ensure Felix stays still while eating
            return;  // Prevents movement input during eating animation
        }
        
        if (this.isHammering) {
            return;  //  Lock movement during hammer animation
        }
    
        if (this.isPoweredUp) {
            const speed = 200;  // Adjust flying speed if needed
    
            if (this.powerUpControls.left.isDown) {
                this.setVelocityX(-speed);
            } else if (this.powerUpControls.right.isDown) {
                this.setVelocityX(speed);
            } else {
                this.setVelocityX(0);
            }
    
            if (this.powerUpControls.up.isDown) {
                this.setVelocityY(-speed);
            } else if (this.powerUpControls.down.isDown) {
                this.setVelocityY(speed);
            } else {
                this.setVelocityY(0);
            }
            this.handleHammering(true);
        } else {
            this.handleMovement();
            this.handleJumping();
            this.handleHammering();
    
            //  Drop-through platform logic (only works when NOT powered up)
            if (this.cursors.down.isDown && this.body.blocked.down) {
                this.body.checkCollision.up = false;
                this.setVelocityY(100);
            } else {
                this.body.checkCollision.up = true;
            }
        }
    }
    

    handleMovement() {
        this.setVelocityX(0);

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.moveSpeed);
            this.anims.play('walk', true);
            this.setFlipX(false);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.moveSpeed);
            this.anims.play('walk', true);
            this.setFlipX(true);
        } else if (!this.isJumping) {
            this.anims.play('idle', true);
        }
    }

    handleJumping() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.body.blocked.down) {
            this.setVelocityY(-600);
            this.isJumping = true;
            this.anims.play('jump', true);
            this.scene.jumpSound.play();
        }

        if (this.cursors.down.isDown && this.body.blocked.down) {
            this.body.checkCollision.up = false;   // Temporarily disable "standing" collision
            this.setVelocityY(100);                 // Nudge player down
        } else {
            this.body.checkCollision.up = true;    // Re-enable standing on platform
        }

        if (this.body.blocked.down) {
            this.isJumping = false;
        }
    }

    handleHammering(autoFix = false) {  // 
        if (autoFix || Phaser.Input.Keyboard.JustDown(this.hammerKey)) {
            if (!autoFix) {  // Only play hammer animation if manually hammering
                this.isHammering = true;
                this.anims.play('hammer', true);
            }
            const overlappingWindows = this.scene.physics.overlap(this, this.scene.brokenWindows, (felix, window) => {
                window.destroy();  // Window is fixed!
                this.scene.fixWinSound.play();
                console.log('Window fixed!');
                this.scene.windowsRemaining--;

                this.scene.score+=200;
                this.scene.updateScoreText();


                if (this.scene.windowsRemaining === 0) {
                    console.log("Stage Cleared! Moving to next stage...");
                    this.scene.time.delayedCall(1000, () => {  // Small delay before switching scenes
                        //this.scene.startNextStage();
                        this.scene.scene.start("StageCleared");
                    });
                }
    

            });
    
            if (!overlappingWindows && !autoFix) {
                console.log('No window to fix');
            }
    

            if (!autoFix) {
                this.scene.time.delayedCall(200, () => {
                    this.isHammering = false;
                });
            }
    
        }
    }

    takeDamage() {
        console.log("Felix took damage!");
        this.scene.hurtSound.play();
        // Tell the scene to remove a life
        this.scene.loseLife();
    }


}

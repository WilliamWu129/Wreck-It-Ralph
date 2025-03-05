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
        if (this.isHammering) {
            return;  // Lock during hammer animation
        }

        // if (this.isClimbing) {
        //     this.handleClimbing();
        //     return;
        // }

        this.handleMovement();
        this.handleJumping();
        this.handleHammering();

        if (this.cursors.down.isDown && this.body.blocked.down) {
            this.body.checkCollision.up = false;
            this.setVelocityY(100);
        } else {
            this.body.checkCollision.up = true;
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

    handleHammering() {
        if (Phaser.Input.Keyboard.JustDown(this.hammerKey)) {
            this.isHammering = true;
            this.anims.play('hammer', true);

            this.scene.time.delayedCall(400, () => {
                this.isHammering = false;
            });
        }
    }

    // handleClimbing() {
    //     this.setVelocityX(0);

    //     if (this.cursors.up.isDown) {
    //         this.setVelocityY(-this.climbSpeed);
    //         this.anims.play('walk', true);  // Reuse walk animation for climbing
    //     } else if (this.cursors.down.isDown) {
    //         this.setVelocityY(this.climbSpeed);
    //         this.anims.play('walk', true);
    //     } else {
    //         this.setVelocityY(0);
    //         this.anims.play('idle', true);
    //     }
    // }

    // startClimbing() {
    //     this.isClimbing = true;
    //     this.body.allowGravity = false;
    //     this.setVelocityX(0);
    // }

    // stopClimbing() {
    //     this.isClimbing = false;
    //     this.body.allowGravity = true;
    // }
}

class Ralph extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ralph');

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //sizing
        this.setScale(0.5);
        this.body.setSize(this.width * 0.5, this.height * 0.5);

        //this.body.setOffset(10, 20)



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
        if (this.x <= 100) {
            this.setVelocityX(50);
            this.setFlipX(false);
        } else if (this.x >= 500) {
            this.setVelocityX(-50);
            this.setFlipX(true);
        }

        if (time > this.lastAttackTime + this.timeToAttack) {
            this.startAttack();
            this.lastAttackTime = time;
        }
    }

    startAttack() {
        this.play('ralph-windup');
        this.scene.time.delayedCall(500, () => {
            this.play('ralph-attack');
            this.scene.time.delayedCall(500, () => {
                this.play('ralph-walk');
            });
        });
    }
}

class Cake extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'cake'); 

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);  // Adjust if needed
        this.setImmovable(true);
        this.body.allowGravity = false;  

        // Add overlap event with Felix
        scene.physics.add.overlap(this, scene.felix, () => {
            scene.collectCake();
            this.destroy();  // Remove cake after collection
        });
    }
}


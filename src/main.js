let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    physics:{
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [menuScene, PlayScene]
}


let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3



//work on ladders next and then after fix platforms so that you can go through them?

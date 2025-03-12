//William Wu 
/*
Wreck it Ralph

*/

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
    scene: [Menu, PlayScene, StageCleared]
}


let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3



// cake need to be invincible still, and have player animations move properly

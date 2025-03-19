//William Wu 
/*
Wreck it Ralph

Technical
Uses Physics system for moving and bricks pretty much everything uses phyics

Collision with platfroms(hitbox with windows, bricks)

Static and Dynamic TileMap making platforms static when Felix interacts with them

Animation manager ( Felix, Ralph, eating cake etc)

Timer System is used a some examples when delaying cake spawning, power up not instant

Text objects including scoring at top left, and all text throughout every scene

Particle effect on the play button in the menu


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

    scene: [Menu, Instructions, Credits, PlayScene, StageCleared, GameOver]
}


let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3




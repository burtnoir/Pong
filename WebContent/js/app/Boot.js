define([
  'Phaser'
], function (Phaser) {

    var Pong = Pong || {};

    Pong.Boot = function (game) {};

    Pong.Boot.prototype = {
        preload: function () {

            // Assets for the loading screen go here.
            this.load.image('preloadbouncer', 'img/23.png');
        },

        create: function () {

            //Use arcade physic as we are using the arcade physics build. 
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //  We don't check bounds collisions against the left and right walls.
            this.game.physics.arcade.checkCollision.left = false;
            this.game.physics.arcade.checkCollision.right = false;

            this.state.start('Preload');
        }
    };

    return Pong.Boot;
});
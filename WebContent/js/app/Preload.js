define([
  'Phaser'
], function (Phaser) {

    var Pong = Pong || {};

    //loading the game assets
    Pong.Preload = function (game) {};

    Pong.Preload.prototype = {
        preload: function () {

            // Show loading screen
            this.preloadbouncer = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbouncer');
            this.preloadbouncer.anchor.setTo(0.5);

            // Add a handler for the load complete event so we can move on to the menu.
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.preloadbouncer);

            this.game.load.image('net', 'img/net.png');
            this.game.load.image('bat', 'img/bat.png');
            this.game.load.image('ball', 'img/ball.png');

            this.game.load.audio('pongblipe4', "snd/4387__noisecollector__pongblipe4.wav");
            this.game.load.audio('pongblipe5', "snd/4388__noisecollector__pongblipe5.wav");
            this.game.load.audio('pongblipf-4', "snd/4390__noisecollector__pongblipf-4.wav");
            this.game.load.audio('pongblipf-5', "snd/4391__noisecollector__pongblipf-5.wav");

        },

        create: function () {},

        update: function () {
            if (this.ready) {
                this.state.start('Menu');
            }
        },

        onLoadComplete: function () {
            this.ready = true;
        }
    };

    return Pong.Preload;
});
define([
  'Phaser'
], function (Phaser) {

    var Pong = Pong || {};

    // Create a menu state.
    Pong.Menu = function (game) {};

    Pong.Menu.prototype = {
        preload: function () {},

        create: function () {
            var style = {
                font: '65px Atomic Age',
                fill: '#ffffff',
                align: 'center'
            };

            this.titleText = this.game.add.text(this.game.world.centerX, 150, 'PONG!', style);
            this.titleText.anchor.setTo(0.5, 0.5);

            this.instructionsText = this.game.add.text(this.game.world.centerX, 250, 'Click anywhere to start', {
                font: '24px VT323',
                fill: '#30eb54',
                align: 'center'
            });
            this.instructionsText.anchor.setTo(0.5, 0.5);

            this.instructionsKeys1 = this.game.add.text(this.game.world.centerX, 330, 'Player 1 uses <shift> and <ctrl> to move up and down.\n\nPlayer 2 uses <up> and <down> to move up and down.', {
                font: '20px VT323',
                fill: '#30eb54',
                align: 'left'
            });
            this.instructionsKeys1.anchor.setTo(0.5, 0.5);
        },

        update: function () {
            if (this.game.input.activePointer.justPressed()) {
                this.state.start('Pong');
            }
        }
    };

    return Pong.Menu;
});
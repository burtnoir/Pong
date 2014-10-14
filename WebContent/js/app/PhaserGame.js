define([
  'Phaser'
], function (Phaser) {

    var PhaserGame = function (w, h) {
        return new Phaser.Game(w, h, Phaser.CANVAS);
    };

    return PhaserGame;
});
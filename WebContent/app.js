// Place any third party dependencies in the lib folder.
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        Phaser: './phaser-arcade-physics.min',
        app: '../app'
    }
});

require([
  'app/PhaserGame',
  'app/Boot',
  'app/Preload',
  'app/Menu',
  'app/Pong'
], function (PhaserGame, Boot, Preload, Menu, Pong) {

    Pong = Pong || {};
    Pong.game = new PhaserGame(800, 600);
    Pong.game.state.add('Boot', Boot);
    Pong.game.state.add('Preload', Preload);
    Pong.game.state.add('Menu', Menu);
    Pong.game.state.add('Pong', Pong);

    Pong.game.state.start('Boot');
});
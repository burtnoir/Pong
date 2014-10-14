define([
  'Phaser'
], function (Phaser) {

    var Pong = Pong || {};

    //title screen
    Pong.Pong = function (game) {};

    Pong.Pong.prototype = {
        create: function () {

            var net;

            // Create a background to show some text against when the game is over.
            this.block = new Phaser.BitmapData(this.game, 'block', 20, 20);
            this.block.fill(0, 0, 0);

            //	Here we set-up our audio sprites
            this.pongblipe4 = this.game.add.audio('pongblipe4');
            this.pongblipe5 = this.game.add.audio('pongblipe5');
            this.pongblipf4 = this.game.add.audio('pongblipf-4');
            this.pongblipf5 = this.game.add.audio('pongblipf-5');

            this.player1 = this.game.add.sprite(15, 145, 'bat');
            this.player1.anchor.setTo(0.5, 0.5);
            this.player1.ballHitSound = this.pongblipf4;
            this.player1.flatAngle = 90;
            this.player1.flatAnchor = 1;
            this.player1.score = 0;

            this.game.physics.enable(this.player1, Phaser.Physics.ARCADE);

            this.player1.body.collideWorldBounds = true;
            this.player1.body.immovable = true;

            this.player2 = this.game.add.sprite(785, 145, 'bat');
            this.player2.anchor.setTo(0.5, 0.5);
            this.player2.ballHitSound = this.pongblipe4;
            this.player2.flatAngle = -90;
            this.player2.flatAnchor = 0;
            this.player2.score = 0;

            this.game.physics.enable(this.player2, Phaser.Physics.ARCADE);

            this.player2.body.collideWorldBounds = true;
            this.player2.body.immovable = true;

            // Create the net - just decoration but it should be there.
            net = this.game.add.group();
            net.classType = Phaser.Image;

            for (var i = 0; i < this.game.world.height; i += 15) {
                net.create(this.game.world.centerX, i, 'net');
            }

            this.ball = this.game.add.sprite(this.player1.x, this.player1.y, 'ball');
            this.ball.anchor.set(0.5);
            this.ball.checkWorldBounds = true;

            this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);

            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce.setTo(1.1, 1.1);

            this.ball.events.onOutOfBounds.add(this.ballLost, this);

            // Set the ball moving.
            this.ball.body.velocity.setTo(200, 200);

            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
            this.ctrlKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

            this.p1ScoreText = this.game.add.text(this.game.world.centerX - 50, 40, this.player1.score.toString(), {
                font: "52px Atomic Age",
                fill: "#ffffff",
                align: "left"
            });
            this.p1ScoreText.anchor.setTo(0.5, 0.5);
            this.p2ScoreText = this.game.add.text(this.game.world.centerX + 50, 40, this.player2.score.toString(), {
                font: "52px Atomic Age",
                fill: "#ffffff",
                align: "right"
            });
            this.p2ScoreText.anchor.setTo(0.5, 0.5);
        },

        update: function () {

            // Move the players
            if (this.shiftKey.isDown) {
                this.player1.y -= 10;
            } else if (this.ctrlKey.isDown) {
                this.player1.y += 10;
            } else if (this.upKey.isDown) {
                this.player2.y -= 10;
            } else if (this.downKey.isDown) {
                this.player2.y += 10;
            }

            this.game.physics.arcade.collide(this.ball, this.player1, this.ballHitPlayer, null, this);
            this.game.physics.arcade.collide(this.ball, this.player2, this.ballHitPlayer, null, this);
        },

        /**
         * The ball has gone off the screen.  Score a point, play a sound and check to see if the this.game is over.
         * @param {Object} _ball [[Description]]
         */
        ballLost: function (_ball) {

            // Register a point for the correct player.
            if (_ball.x < 10) {
                this.player2.score++;
                this.p2ScoreText.setText(this.player2.score);
                this.pongblipe5.play();

                if (this.player2.score > 4) {
                    this.gameOver();
                } else {
                    //Fire the ball at the previous point winner.
                    _ball.reset(this.player1.x, this.player1.y);
                    _ball.body.velocity.setTo(200, 200);

                }

            } else {
                this.player1.score++;
                this.p1ScoreText.setText(this.player1.score);
                this.pongblipf5.play();

                if (this.player1.score > 4) {
                    this.gameOver();
                } else {
                    //Fire the ball at the previous point winner.
                    _ball.reset(this.player2.x, this.player2.y);
                    _ball.body.velocity.setTo(-200, -200);
                }
            }
        },

        /**
         * What to do when the game is over.
         */
        gameOver: function () {

            var winner, tween, instructions;

            this.game.physics.arcade.checkCollision.left = true;
            this.game.physics.arcade.checkCollision.right = true;

            if (this.player1.score < 5) {
                this.loseRoutine(this.player1);
                winner = "Player 2 Wins!";
                this.winRoutine(this.player2);
            } else {
                this.loseRoutine(this.player2);
                winner = "Player 1 Wins!";
                this.winRoutine(this.player1);
            }
            this.ball.body.velocity.setTo(0, 0);
            this.ball.kill();

            this.game.add.text(this.game.world.centerX - 185, this.game.world.centerY - 190, '--GAME OVER--\n' + winner, {
                font: "64px VT323",
                fill: "#ffffff",
                align: "center"
            });

            this.block.addToWorld(this.game.world.centerX, 330, 0.5, 0.5);

            instructions = this.game.add.text(this.game.world.centerX, 330, 'Click anywhere to restart', {
                font: '24px VT323',
                fill: '#30eb54',
                align: 'center'
            });
            instructions.anchor.setTo(0.5, 0.5);

            // Add a input listener that can help us return from being paused
            this.game.input.onDown.add(this.restart, self);
        },

        /**
         * Loser falls down.
         * @param {[[Type]]} _player [[Description]]
         */
        loseRoutine: function (_player) {
            var tween;
            _player.anchor.setTo(_player.flatAnchor, 1);
            tween = this.game.add.tween(_player).to({
                y: this.game.world.height
            }, 1500, Phaser.Easing.Bounce.Out, true, 0, 0);
            tween.onComplete.add(this.fallOver, _player);
        },

        /**
         * Loser falls over.
         * @param {Object} _player [[Description]]
         * @param
         */
        fallOver: function (_player) {
            this.game.add.tween(_player).to({
                angle: _player.flatAngle
            }, 1500, Phaser.Easing.Elastic.In, true, 0, false);
        },

        /**
         * Set the winner spinning off around the field.
         * @param {[[Type]]} _player [[Description]]
         */
        winRoutine: function (_player) {
            _player.body.angularVelocity = 200;
            _player.body.velocity.setTo(-200, -200);
            _player.body.collideWorldBounds = true;
            _player.body.bounce.setTo(0.9, 0.9);
        },

        /**
         * Callback when the ball hits a player.  We want to fiddle the velocity and play a sound.
         * @param {Object} _ball   The ball
         * @param {Object} _player The player that was hit
         */
        ballHitPlayer: function (_ball, _player) {

            if (_ball.y < _player.y) {
                //  Ball is on the top end of the paddle
                _ball.body.velocity.y = (-10 * (_player.y - _ball.y));
            } else if (_ball.y > _player.y) {
                //  Ball is on the bottom end of the paddle
                _ball.body.velocity.y = (10 * (_ball.y - _player.y));
            }
            _player.ballHitSound.play();
        },

        restart: function (self) {
            // The creating object is passed in so we can use it just like 'this'.
            // Need to allow a restart once the game is won.
            if (self.game.input.activePointer.justPressed()) {
                // Reset the collision checking and start again.
                self.game.physics.arcade.checkCollision.left = false;
                self.game.physics.arcade.checkCollision.right = false;
                self.game.state.restart('Pong');
            }
        },

        /**
         * We can throw some debug stuff in here if needed.
         */
        render: function () {

        }
    };

    return Pong.Pong;
});
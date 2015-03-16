(function () {
    'use strict';

    angular
        .module('app.Game')
        .factory('Player', PlayerPrefab);

    PlayerPrefab.$inject = ['$log'];

    function PlayerPrefab ($log){
        var Player = function (game, x, y, frame) {
            Phaser.Sprite.call(this, game, x, y, 'player', frame);

            // ref player's position
            this._gridPosition = new Phaser.Point(0, 0);
            this._isMoving = false;

            // enable physic body
            game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            // offset bound body since the player's sprite size is larger than tile set of 16x16
            // the bound box will on the bottom half of the sprite
            this.body.setSize(8, 8, 4, 12);

            // add animations
            this.animations.add('up', [0,1,2], 6, true);
            this.animations.add('right', [3,4,5], 6, true);
            this.animations.add('idle', [6,7,8], 6, true);
            this.animations.add('left', [9,10,11], 6, true);
            // play idle animation
            this.animations.play('idle');
        };

        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player;

        Player.prototype.update = function (cursors) {
            if(angular.isUndefined(cursors)) { return; }

            if (cursors.up.isDown) {
                this.animations.play('up');
                this.movePlayer(0,-1);
            }
            else if (cursors.down.isDown) {
                this.animations.play('idle');
                this.movePlayer(0,1);
            }

            if (cursors.left.isDown) {
                this.animations.play('left');
                this.movePlayer(-1,0);
            }
            else if (cursors.right.isDown) {
                this.animations.play('right');
                this.movePlayer(1,0);
            }
        };

        Player.prototype.movePlayer = function (x, y) {
            if (this._isMoving) { return; }

            this._isMoving = true;

            this._gridPosition.x += x;
            this._gridPosition.y += y;

            this._gridPosition.x = (this._gridPosition.x < 0) ? 0 : this._gridPosition.x;
            this._gridPosition.y = (this._gridPosition.y < 0) ? 0 : this._gridPosition.y;

            this._gridPosition.x = (this._gridPosition.x > this.game.world.width/16 - 2) ? this.game.world.width/16 - 2 : this._gridPosition.x;
            this._gridPosition.y = (this._gridPosition.y > this.game.world.height/16 - 2) ? this.game.world.height/16 - 2 : this._gridPosition.y;


            this.game.add
                .tween(this)
                .to({x: this._gridPosition.x * 16, y: this._gridPosition.y * 16 + 3}, 250, Phaser.Easing.Quadratic.InOut, true)
                .onComplete.add(function() {
                    this._isMoving = false;
                }, this);
        };

        return Player;
    }

})();

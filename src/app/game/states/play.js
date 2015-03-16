(function () {
    'use strict';

    angular
        .module('app.Game')
        .factory('PlayState', PlayState);

    PlayState.$inject = ['$log', 'Tilemap', 'Player', 'EventGroup'];

    function PlayState ($log, Tilemap, Player, EventGroup) {
        function Play () {
            this._map = null;
            this._player = null;
            this._eventsGroup = null;
        }

        Play.prototype = {
            create: function () {
                console.log('play state create');
                this.game.time.advancedTiming = true;

                // enabled physics system
                this.game.physics.startSystem(Phaser.Physics.ARCADE);


                // add world map
                this._map = new Tilemap(this.game, 'worldMap');


                // add events for player interaction
                this._eventsGroup = new EventGroup(this.game, this.world, this._map);


                // add player
                this._player = new Player(this.game, 0, 3);
                this.game.add.existing(this._player);


                /*  Controls
                 **************************************************************/
                // Set up our controls.
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.game.input.keyboard.addKeyCapture([
                    Phaser.Keyboard.LEFT,
                    Phaser.Keyboard.RIGHT,
                    Phaser.Keyboard.UP,
                    Phaser.Keyboard.DOWN
                ]);


                /*  Camera
                 **************************************************************/
                this.game.camera.follow(this._player);
            },
            update: function () {
                this.game.physics.arcade.overlap(this._player, this._eventsGroup, function(p,e){$log.info('a');}, null, this);

                this._player.update(this.cursors);
            },
            render: function () {
                this.game.debug.text(this.game.time.fps || '--', 2, 14, "#a7aebe");
            }
        };

        return Play;
    }
})();
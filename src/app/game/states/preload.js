(function () {
    'use strict';

    angular
        .module('app.Game')
        .factory('PreloadState', PreloadState);

    PreloadState.$inject = ['$log'];

    function PreloadState ($log) {
        function Preload () {
            this.asset = null;
            this.ready = false;
        }

        Preload.prototype = {
            preload: function () {
                this.stage.backgroundColor = '#ffff00';

                this.asset = this.add.sprite(this.world.width/2,this.world.height/2.5, 'preloader');
                this.asset.anchor.setTo(0.5, 0.5);
                this.load.setPreloadSprite(this.asset);

                this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

                // load world tile
                this.load.tilemap('worldMap', 'src/assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
                this.load.image('tile', 'src/assets/tilemaps/tile.png');
                this.load.image('happyland', 'src/assets/tilemaps/happyland.png');

                // load player
                this.load.spritesheet('player', 'src/assets/images/player.png', 16, 27);
            },
            update: function () {
                if(!!this.ready) {
                    console.log('preload ready for play');
                    this.state.start('play');
                }
            },
            onLoadComplete: function () {
                this.ready = true;
            }
        };

        return Preload;
    }
})();
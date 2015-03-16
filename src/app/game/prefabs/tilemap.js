(function () {
    'use strict';

    angular
        .module('app.Game')
        .factory('Tilemap', TilemapPrefab);

    TilemapPrefab.$inject = ['$log'];

    function TilemapPrefab ($log){
        var Tilemap = function (game, key) {
            Phaser.Tilemap.call(this, game, key);

            var backgroundLayer;

            // add tile sets
            this.addTilesetImage('tile', 'tile');
            this.addTilesetImage('happyland', 'happyland');
            // create map layers, reference the background layer
            backgroundLayer = this.createLayer('grass');
            this.createLayer('tree');
            this.createLayer('object');
            //resizes the game world to match the layer dimensions
            backgroundLayer.resizeWorld();
        };

        Tilemap.prototype = Object.create(Phaser.Tilemap.prototype);
        Tilemap.prototype.constructor = Tilemap;

        return Tilemap;
    }

})();
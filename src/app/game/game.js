(function () {
    'use strict';

    angular
        .module('app.Game', [])
        .service('Game', Game);

    Game.$inject = ['$log', 'BootState', 'PreloadState', 'PlayState'];

    function Game($log, BootState, PreloadState, PlayState) {
        // Private
        var _self = this,
            _gameInstance;

        // Public
        _self.isGameRunning = false;
        _self.startGame = function startGame() {
            _gameInstance = new Phaser.Game('100', '100', Phaser.AUTO, 'game-view');

            // Game States
            _gameInstance.state.add('boot', BootState);
            _gameInstance.state.add('preload', PreloadState);
            _gameInstance.state.add('play', PlayState);

            _gameInstance.state.start('boot');

            _self.isGameRunning = true;
        };
    }
})();
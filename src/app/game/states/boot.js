(function () {
    'use strict';

    angular
        .module('app.Game')
        .factory('BootState', BootState);

    BootState.$inject = ['$log'];

    function BootState ($log) {
        function Boot () {
        }

        Boot.prototype = {
            preload: function () {
                this.load.image('preloader', 'src/assets/images/preloader.gif');
            },
            create: function () {
                this.input.maxPointers = 1;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.state.start('preload');
            }
        };

        return Boot;
    }
})();
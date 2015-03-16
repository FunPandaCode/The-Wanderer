(function () {
    'use strict';

    angular
        .module('app.Game')
        .factory('EventGroup', EventGroupPrefab);

    EventGroupPrefab.$inject = ['$log'];

    function EventGroupPrefab ($log){
        var EventGroup = function (game, parent, map) {
            Phaser.Group.call(this, game, parent);

            this.enableBody = true;
            this.physicsBodyType = Phaser.Physics.ARCADE;
            // load event objects into events group
            var events = findObjectsByType('Event', map, 'events');
            events.forEach(function(element){
                createFromTiledObject(element, this);
            }, this);
        };

        EventGroup.prototype = Object.create(Phaser.Group.prototype);
        EventGroup.prototype.constructor = EventGroup;

        return EventGroup;


        /* //////////////////////////////////////////////// */


        function findObjectsByType (type, map, layerName) {
            var result = [];
            map.objects[layerName].forEach(function(element){
                if(element.type === type) {
                    result.push(element);
                }
            });

            return result;
        }

        function createFromTiledObject (element, group) {
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            sprite.anchor.set(0.5);

            //copy all properties to the sprite
            Object.keys(element).forEach(function(key){
                sprite[key] = element[key];
            });

            sprite.properties = [];
            Object.keys(element.properties).forEach(function(key){
                sprite.properties[key] = element.properties[key];
            });
        }
    }

})();

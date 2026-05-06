define("servicepage/servicePage/userservicePageController", function() {
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {},
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {}
    };
});
define("servicepage/servicePage/servicePageControllerActions", {
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("servicepage/servicePage/servicePageController", ["servicepage/servicePage/userservicePageController", "servicepage/servicePage/servicePageControllerActions"], function() {
    var controller = require("servicepage/servicePage/userservicePageController");
    var actions = require("servicepage/servicePage/servicePageControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    controller.initializeProperties = function() {
        if (this.initGettersSetters) {
            this.initGettersSetters.apply(this, arguments);
        }
    };
    return controller;
});

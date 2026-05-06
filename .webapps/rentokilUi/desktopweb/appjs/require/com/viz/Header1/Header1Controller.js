define("com/viz/Header1/userHeader1Controller", function() {
    return {};
});
define("com/viz/Header1/Header1ControllerActions", {
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("com/viz/Header1/Header1Controller", ["com/viz/Header1/userHeader1Controller", "com/viz/Header1/Header1ControllerActions"], function() {
    var controller = require("com/viz/Header1/userHeader1Controller");
    var actions = require("com/viz/Header1/Header1ControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

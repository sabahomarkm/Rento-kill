define("userForm3Controller", {
    //Type your controller code here 
});
define("Form3ControllerActions", {
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_Button_f4a3f1b929a94eeb86b316e033bb3d0b: function AS_Button_f4a3f1b929a94eeb86b316e033bb3d0b(eventobject) {
        var self = this;

        function INVOKE_IDENTITY_SERVICE_ide_onClick_eec37b0abaa943928a9f1a501dc40265_Success(response) {
            var ntf = new voltmx.mvc.Navigation({
                "appName": "rentokilUi",
                "friendlyName": "Form1"
            });
            ntf.navigate();
        }

        function INVOKE_IDENTITY_SERVICE_ide_onClick_eec37b0abaa943928a9f1a501dc40265_Failure(error) {}
        if (logout_inputparam == undefined) {
            var logout_inputparam = {};
        }
        logout_inputparam["serviceID"] = "authService$logout";
        logout_inputparam["operation"] = "logout";
        authService$logout = mfidentityserviceinvoker("authService", logout_inputparam, INVOKE_IDENTITY_SERVICE_ide_onClick_eec37b0abaa943928a9f1a501dc40265_Success, INVOKE_IDENTITY_SERVICE_ide_onClick_eec37b0abaa943928a9f1a501dc40265_Failure);
    }
});
define("Form3Controller", ["userForm3Controller", "Form3ControllerActions"], function() {
    var controller = require("userForm3Controller");
    var controllerActions = ["Form3ControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

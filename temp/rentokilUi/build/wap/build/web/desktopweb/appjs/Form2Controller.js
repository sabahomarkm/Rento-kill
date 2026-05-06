define("userForm2Controller", {});
define("Form2ControllerActions", {
    /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_TextField_e008f4a8007641228a0334cbc99573e3: function AS_TextField_e008f4a8007641228a0334cbc99573e3(eventobject, changedtext) {
        var self = this;
        var address = txtAddress;
    },
    AS_Button_ga79bca28539434a990d3bcc264f7a19: function AS_Button_ga79bca28539434a990d3bcc264f7a19(eventobject) {
        var self = this;

        function INVOKE_SERVICE_a6d407b3a3be4a83b2c758e2b6b8e650_Success(response) {
            var ntf = new voltmx.mvc.Navigation({
                "appName": "rentokilUi",
                "friendlyName": "Form1"
            });
            ntf.navigate();
        }

        function INVOKE_SERVICE_a6d407b3a3be4a83b2c758e2b6b8e650_Failure(error) {}
        if (logout_inputparam == undefined) {
            var logout_inputparam = {};
        }
        logout_inputparam["serviceID"] = "authService$logout";
        logout_inputparam["operation"] = "logout";
        authService$logout = mfidentityserviceinvoker("authService", logout_inputparam, INVOKE_SERVICE_a6d407b3a3be4a83b2c758e2b6b8e650_Success, INVOKE_SERVICE_a6d407b3a3be4a83b2c758e2b6b8e650_Failure);
    },
    AS_Button_de218f48466f44878d4eb3ef736ed65a: function AS_Button_de218f48466f44878d4eb3ef736ed65a(eventobject) {
        var self = this;
        var ntf = new voltmx.mvc.Navigation({
            "appName": "rentokilUi",
            "friendlyName": "Form3"
        });
        ntf.navigate();
    },
    AS_Button_g7c8156731514d52bff6b2374f0db80e: function AS_Button_g7c8156731514d52bff6b2374f0db80e(eventobject) {
        var self = this;

        function INVOKE_SERVICE_cccfebe41a8749dd9672a20668f120bf_Callback(rentokil) {
            if (rentokil.opstatus == 0 || rentokil.opstatus == 0) {
                alert("Sucessfully booked service,Our agent will reach out you !");
            } else {
                console.log("failed");
                alert("Something went wrong !")
            }
        }
        if (rentokil_inputparam == undefined) {
            var rentokil_inputparam = {};
        }
        rentokil_inputparam["serviceID"] = "rentokilApiServices$rentokil$create";
        rentokil_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "create"
        };
        var data = {};
        data["name"] = self.view.Username.text;
        data["address"] = self.view.Address.text;
        data["service"] = self.view.serviceName.text;
        data["type"] = self.view.TypeName.text;
        rentokil_inputparam["options"]["data"] = data;
        var rentokil_httpheaders = {};
        rentokil_inputparam["httpheaders"] = rentokil_httpheaders;
        var rentokil_httpconfigs = {};
        rentokil_inputparam["httpconfig"] = rentokil_httpconfigs;
        rentokilApiServices$rentokil$create = mfobjectsecureinvokerasync(rentokil_inputparam, "rentokilApiServices", "rentokil", INVOKE_SERVICE_cccfebe41a8749dd9672a20668f120bf_Callback);
    },
    AS_TextField_a22caf24b87b4208a5510675b2fbb249: function AS_TextField_a22caf24b87b4208a5510675b2fbb249(eventobject, changedtext) {
        var self = this;
        var userType = txtuserType;
    },
    AS_TextField_hdd24c92d032445588a7d3cb97ce30aa: function AS_TextField_hdd24c92d032445588a7d3cb97ce30aa(eventobject, changedtext) {
        var self = this;
        var userName = txtuserName;
    },
    AS_TextField_f1c8b213f6f34d42a1b9624f798fea12: function AS_TextField_f1c8b213f6f34d42a1b9624f798fea12(eventobject, changedtext) {
        var self = this;
        var serviceName = txtserviceName;
    }
});
define("Form2Controller", ["userForm2Controller", "Form2ControllerActions"], function() {
    var controller = require("userForm2Controller");
    var controllerActions = ["Form2ControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

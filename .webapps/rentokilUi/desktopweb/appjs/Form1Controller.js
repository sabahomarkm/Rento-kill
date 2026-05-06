define("userForm1Controller", {
    //Type your controller code here 
});
define("Form1ControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for Button0ca746dfef44446 **/
    AS_Button_cffc8bcf540d4bca8829ea3dbd05bb6a: function AS_Button_cffc8bcf540d4bca8829ea3dbd05bb6a(eventobject) {
        var self = this;

        function INVOKE_SERVICE_a974f47efc6648389caa1e6be5eb277b_Success(response) {
            alert("Login sucessfull");
            var ntf = new voltmx.mvc.Navigation("Form2");
            ntf.navigate();
        }

        function INVOKE_SERVICE_a974f47efc6648389caa1e6be5eb277b_Failure(error) {
            alert("Login failed. Please try again");
        }
        if (login_inputparam == undefined) {
            var login_inputparam = {};
        }
        login_inputparam["serviceID"] = "authService$login";
        login_inputparam["operation"] = "login";
        login_inputparam["userid"] = self.view.txtUserName.text;
        login_inputparam["password"] = self.view.txtPassword.text;
        authService$login = mfidentityserviceinvoker("authService", login_inputparam, INVOKE_SERVICE_a974f47efc6648389caa1e6be5eb277b_Success, INVOKE_SERVICE_a974f47efc6648389caa1e6be5eb277b_Failure);
    },
    /** onMapping defined for Form1 **/
    AS_Form_b149e0a67b9941b0be953a426fea272e: function AS_Form_b149e0a67b9941b0be953a426fea272e(eventobject) {
        var self = this;

        function INVOKE_IDENTITY_SERVICE_i794ca221eb84c79bbcdabdae152241c_Success(response) {
            voltmx.application.dismissLoadingScreen();
        }

        function INVOKE_IDENTITY_SERVICE_i794ca221eb84c79bbcdabdae152241c_Failure(error) {
            voltmx.application.dismissLoadingScreen();
        }
        voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (login_inputparam == undefined) {
            var login_inputparam = {};
        }
        login_inputparam["serviceID"] = "authService$login";
        login_inputparam["operation"] = "login";
        login_inputparam["userid"] = self.view.txtUserName.text;
        login_inputparam["password"] = self.view.txtPassword.text;
        authService$login = mfidentityserviceinvoker("authService", login_inputparam, INVOKE_IDENTITY_SERVICE_i794ca221eb84c79bbcdabdae152241c_Success, INVOKE_IDENTITY_SERVICE_i794ca221eb84c79bbcdabdae152241c_Failure);
    },
    /** onTextChange defined for txtPassword **/
    AS_TextField_a28d55e44f554f86b7bbd3ca6a35f520: function AS_TextField_a28d55e44f554f86b7bbd3ca6a35f520(eventobject, changedtext) {
        var self = this;
        var userPassword = txtUserPassword;
    },
    /** onTextChange defined for txtUserName **/
    AS_TextField_bdfbcb78e99c4d45bba2ecaa2e370b05: function AS_TextField_bdfbcb78e99c4d45bba2ecaa2e370b05(eventobject, changedtext) {
        var self = this;
        var userName = txtUserName;
    }
});
define("Form1Controller", ["userForm1Controller", "Form1ControllerActions"], function() {
    var controller = require("userForm1Controller");
    var controllerActions = ["Form1ControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

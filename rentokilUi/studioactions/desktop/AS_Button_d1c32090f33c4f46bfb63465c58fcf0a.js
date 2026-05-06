function AS_Button_d1c32090f33c4f46bfb63465c58fcf0a(eventobject) {
    var self = this;

    function INVOKE_IDENTITY_SERVICE_ide_onClick_f3532a2913534623a9970c28eef97383_Success(response) {}
    function INVOKE_IDENTITY_SERVICE_ide_onClick_f3532a2913534623a9970c28eef97383_Failure(error) {}
    if (logout_inputparam == undefined) {
        var logout_inputparam = {};
    }
    logout_inputparam["serviceID"] = "authService$logout";
    logout_inputparam["operation"] = "logout";
    authService$logout = mfidentityserviceinvoker("authService", logout_inputparam, INVOKE_IDENTITY_SERVICE_ide_onClick_f3532a2913534623a9970c28eef97383_Success, INVOKE_IDENTITY_SERVICE_ide_onClick_f3532a2913534623a9970c28eef97383_Failure);
}
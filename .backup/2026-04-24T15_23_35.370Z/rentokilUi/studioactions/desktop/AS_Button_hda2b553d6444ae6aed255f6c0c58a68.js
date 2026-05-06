function AS_Button_hda2b553d6444ae6aed255f6c0c58a68(eventobject) {
    var self = this;

    function INVOKE_IDENTITY_SERVICE_ide_onClick_f720bf668aec447da497253275e84c50_Success(response) {
        alert("Login sucessfull");
        var ntf = new voltmx.mvc.Navigation("Form2");
        ntf.navigate();
    }
    function INVOKE_IDENTITY_SERVICE_ide_onClick_f720bf668aec447da497253275e84c50_Failure(error) {
        alert("Login failed. Please try again");
    }
    if (login_inputparam == undefined) {
        var login_inputparam = {};
    }
    login_inputparam["serviceID"] = "authService$login";
    login_inputparam["operation"] = "login";
    login_inputparam["userid"] = self.view.txtUserName.text;
    login_inputparam["password"] = self.view.txtPassword.text;
    authService$login = mfidentityserviceinvoker("authService", login_inputparam, INVOKE_IDENTITY_SERVICE_ide_onClick_f720bf668aec447da497253275e84c50_Success, INVOKE_IDENTITY_SERVICE_ide_onClick_f720bf668aec447da497253275e84c50_Failure);
}
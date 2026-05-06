define({
    appInit: function(params) {
        skinsInit();
        voltmx.mvc.registry.add("com.konymp.Login", {
            "viewName": "Login",
            "controllerName": "LoginController"
        });
        voltmx.application.registerMaster({
            "namespace": "com.konymp",
            "classname": "Login",
            "name": "com.konymp.Login"
        });
        voltmx.mvc.registry.add("com.viz.Header1", {
            "viewName": "Header1",
            "controllerName": "Header1Controller"
        });
        voltmx.application.registerMaster({
            "namespace": "com.viz",
            "classname": "Header1",
            "name": "com.viz.Header1"
        });
        voltmx.mvc.registry.add("servicepage.servicePage", {
            "viewName": "servicePage",
            "controllerName": "servicePageController"
        });
        voltmx.application.registerMaster({
            "namespace": "servicepage",
            "classname": "servicePage",
            "name": "servicepage.servicePage"
        });
        voltmx.mvc.registry.add("flxSampleRowTemplate", {
            "viewName": "flxSampleRowTemplate",
            "controllerName": "flxSampleRowTemplateController"
        });
        voltmx.mvc.registry.add("flxSectionHeaderTemplate", {
            "viewName": "flxSectionHeaderTemplate",
            "controllerName": "flxSectionHeaderTemplateController"
        });
        voltmx.mvc.registry.add("Form1", {
            "viewName": "Form1",
            "controllerName": "Form1Controller"
        });
        voltmx.mvc.registry.add("Form2", {
            "viewName": "Form2",
            "controllerName": "Form2Controller"
        });
        voltmx.mvc.registry.add("Form3", {
            "viewName": "Form3",
            "controllerName": "Form3Controller"
        });
        setAppBehaviors();
        if (typeof startBackgroundWorker != "undefined") {
            startBackgroundWorker();
        }
    },
    postAppInitCallBack: function(eventObj) {},
    appmenuseq: function() {
        new voltmx.mvc.Navigation("Form1").navigate();
    },
    makeCall: function(eventobject) {
        voltmx.phone.dial(eventobject.text);
    }
});
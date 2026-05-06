define('applicationController',{
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
define("com/konymp/Login/userLoginController", [],function() {
    constants.DEFAULT_MINIMUM_CHAR_LENGTH = 8;
    constants.USERNAME_VALIDATION_MESSAGE = "Username too small!";
    constants.PASSWORD_VALIDATION_MESSAGE = "Password too small!";
    constants.USERNAME_PASSWORD_VALIDATION_MESSAGE = "Username and Password are too small";
    constants.EMPTY_USERNAME_VALIDATION_MESSAGE = "Username cannot be empty";
    constants.EMPTY_PASSWORD_VALIDATION_MESSAGE = "Password cannot be empty";
    constants.EMPTY_USERNAME_PASSWORD_VALIDATION_MESSAGE = "Username and Password cannot be empty";
    return {
        /**
         * @constructor constructor
         * @param basicConfig
         * @param layoutConfig
         * @param pspConfig
         */
        constructor: function(basicConfig, layoutConfig, pspConfig) {
            this._usernameMinimumChar = constants.DEFAULT_MINIMUM_CHAR_LENGTH;
            this._passwordMinimumChar = constants.DEFAULT_MINIMUM_CHAR_LENGTH;
            this._usernameValidationMsg = constants.USERNAME_VALIDATION_MESSAGE;
            this._passwordValidationMsg = constants.PASSWORD_VALIDATION_MESSAGE;
        },
        /**
         * @function validateUsername
         * @description Validates username entered by the user
         * @private
         * @returns {boolean} true/false
         */
        validateUsername: function() {
            try {
                if (parseInt(this._usernameMinimumChar) > this.getUsername().length) {
                    this.view.txtUserName.text = this.getUsername();
                    this.view.lblError.text = constants.USERNAME_VALIDATION_MESSAGE;
                    this.view.flxError.isVisible = true;
                    this.view.flxError.forceLayout();
                    return false;
                }
                return true;
            } catch (exception) {
                kony.print(JSON.stringify(exception));
                if (exception.type === "CUSTOM") {
                    throw exception;
                }
            }
        },
        /**
         * @function validatePassword
         * @description Validates password entered by the user
         * @private
         * @returns {boolean} true/false
         */
        validatePassword: function() {
            try {
                if (parseInt(this._passwordMinimumChar) > this.getPassword().length) {
                    this.view.txtPassword.text = this.getPassword();
                    this.view.lblError.text = constants.PASSWORD_VALIDATION_MESSAGE;
                    this.view.flxError.isVisible = true;
                    this.view.flxError.forceLayout();
                    return false;
                }
                return true;
            } catch (exception) {
                kony.print(JSON.stringify(exception));
                if (exception.type === "CUSTOM") {
                    throw exception;
                }
            }
        },
        /**  
         * @function validateUsernameAndPassword
         * @description validates empty username and password
         * @private
         * @return {boolean} true/false
         */
        validateUsernameAndPassword: function() {
            var isUsernameEmpty = !this.getUsername().length;
            var isPasswordEmpty = !this.getPassword().length;
            var errorText = null;
            if (isUsernameEmpty && isPasswordEmpty) {
                errorText = constants.EMPTY_USERNAME_PASSWORD_VALIDATION_MESSAGE;
            } else if (isUsernameEmpty) {
                errorText = constants.EMPTY_USERNAME_VALIDATION_MESSAGE;
            } else if (isPasswordEmpty) {
                errorText = constants.EMPTY_PASSWORD_VALIDATION_MESSAGE;
            }
            if (!errorText) {
                var isUsernameSmall = parseInt(this._usernameMinimumChar) > this.getUsername().length;
                var isPasswordSmall = parseInt(this._passwordMinimumChar) > this.getPassword().length;
                if (isUsernameSmall && isPasswordSmall) {
                    errorText = constants.USERNAME_PASSWORD_VALIDATION_MESSAGE;
                } else if (isUsernameSmall) {
                    errorText = constants.USERNAME_VALIDATION_MESSAGE;
                } else if (isPasswordSmall) {
                    errorText = constants.PASSWORD_VALIDATION_MESSAGE;
                }
            }
            if (errorText) {
                this.view.lblError.text = errorText;
                this.view.flxError.isVisible = true;
                this.view.flxError.forceLayout();
            } else {
                this.view.flxError.isVisible = false;
            }
        },
        /**
         * @function getUsername
         * @description Returns username entered by the user
         * @public
         * @return {string} username
         */
        getUsername: function() {
            var uname = (this.view.txtUserName.text).trim();
            return uname;
        },
        /**
         * @function getPassword
         * @description Returns password entered by the user
         * @public
         * @return {string} password
         */
        getPassword: function() {
            var pwd = (this.view.txtPassword.text).trim();
            return pwd;
        }
    };
});
define("com/konymp/Login/LoginControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for ButtonLogin **/
    AS_Button_e97bf980d28c40d18193b23c5b59fe1e: function AS_Button_e97bf980d28c40d18193b23c5b59fe1e(eventobject) {
        var self = this;
        return self.validateUsernameAndPassword.call(this);
    },
    /** onClick defined for flxCheck **/
    AS_FlexContainer_d2f4729b51c14799859cbdc815b94d6c: function AS_FlexContainer_d2f4729b51c14799859cbdc815b94d6c(eventobject) {
        var self = this;
        this.view.imgCHeckBox.isVisible = !this.view.imgCHeckBox.isVisible;
    },
    /** onTouchStart defined for userwidgetmodel **/
    AS_Image_g26f1a6574214dbf814397d68e7fdbe3: function AS_Image_g26f1a6574214dbf814397d68e7fdbe3(eventobject, x, y) {
        var self = this;
        self.view.flxError.isVisible = false;
    },
    /** onDone defined for txtPassword **/
    AS_TextField_a64616d60b2042eb9f431ecfbbbb2720: function AS_TextField_a64616d60b2042eb9f431ecfbbbb2720(eventobject, changedtext) {
        var self = this;
        return self.validatePassword.call(this);
    },
    /** onDone defined for txtUserName **/
    AS_TextField_h5b84d0b2b244fcb808ef432f678bbdc: function AS_TextField_h5b84d0b2b244fcb808ef432f678bbdc(eventobject, changedtext) {
        var self = this;
        return self.validateUsername.call(this);
    }
});
define("com/konymp/Login/LoginController", ["com/konymp/Login/userLoginController", "com/konymp/Login/LoginControllerActions"], function() {
    var controller = require("com/konymp/Login/userLoginController");
    var actions = require("com/konymp/Login/LoginControllerActions");
    for (var key in actions) {
        controller[key] = actions[key];
    }
    return controller;
});

define('com/konymp/Login/Login',[],function() {
    return function(controller) {
        var Login = new voltmx.ui.FlexContainer(extendConfig({
            "centerX": "50%",
            "centerY": "50%",
            "clipBounds": true,
            "isMaster": true,
            "height": "500dp",
            "id": "Login",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "CopyFLXFFFFFF1",
            "width": "500dp",
            "appName": "rentokilUi"
        }, controller.args[0], "Login"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "Login"), extendConfig({}, controller.args[2], "Login"));
        Login.setDefaultUnit(voltmx.flex.DP);
        var lblTopShadow = new voltmx.ui.Label(extendConfig({
            "height": "1dp",
            "id": "lblTopShadow",
            "isVisible": true,
            "left": "0dp",
            "skin": "CopyLBLTOPSHADOW",
            "textStyle": {},
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "lblTopShadow"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblTopShadow"), extendConfig({}, controller.args[2], "lblTopShadow"));
        var lblLeftShadow = new voltmx.ui.Label(extendConfig({
            "height": "100%",
            "id": "lblLeftShadow",
            "isVisible": true,
            "left": "0dp",
            "skin": "CopyCopyCopydefLabel4",
            "textStyle": {},
            "top": "0dp",
            "width": "1dp",
            "zIndex": 1
        }, controller.args[0], "lblLeftShadow"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblLeftShadow"), extendConfig({}, controller.args[2], "lblLeftShadow"));
        var lblBottomShadow = new voltmx.ui.Label(extendConfig({
            "bottom": "0dp",
            "height": "1dp",
            "id": "lblBottomShadow",
            "isVisible": true,
            "left": "0dp",
            "skin": "CopyCopyCopydefLabel2",
            "textStyle": {},
            "width": "100%",
            "zIndex": 1
        }, controller.args[0], "lblBottomShadow"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblBottomShadow"), extendConfig({}, controller.args[2], "lblBottomShadow"));
        var lblRightShadow = new voltmx.ui.Label(extendConfig({
            "height": "100%",
            "id": "lblRightShadow",
            "isVisible": true,
            "right": "0dp",
            "skin": "CopyCopyCopydefLabel4",
            "textStyle": {},
            "top": "0dp",
            "width": "1dp",
            "zIndex": 1
        }, controller.args[0], "lblRightShadow"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblRightShadow"), extendConfig({}, controller.args[2], "lblRightShadow"));
        var flxLoginWrapper = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "bottom": "1dp",
            "clipBounds": true,
            "id": "flxLoginWrapper",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "left": "1dp",
            "isModalContainer": false,
            "right": "1dp",
            "skin": "CopyCopyslFbox0b27090e10e6f4c",
            "top": "1dp",
            "zIndex": 1,
            "appName": "rentokilUi"
        }, controller.args[0], "flxLoginWrapper"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxLoginWrapper"), extendConfig({}, controller.args[2], "flxLoginWrapper"));
        flxLoginWrapper.setDefaultUnit(voltmx.flex.DP);
        var flxError = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "7%",
            "id": "flxError",
            "isVisible": false,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "CopyslFbox0f1ec1bba91f14a",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "appName": "rentokilUi"
        }, controller.args[0], "flxError"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxError"), extendConfig({}, controller.args[2], "flxError"));
        flxError.setDefaultUnit(voltmx.flex.DP);
        var imgClose = new voltmx.ui.Image2(extendConfig({
            "centerX": "10%",
            "centerY": "50%",
            "height": "90%",
            "id": "imgClose",
            "isVisible": true,
            "left": "0dp",
            "onTouchStart": controller.AS_Image_g26f1a6574214dbf814397d68e7fdbe3,
            "skin": "slImage",
            "src": "closeicon_4.png",
            "top": "0dp",
            "width": "10%",
            "zIndex": 1
        }, controller.args[0], "imgClose"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgClose"), extendConfig({}, controller.args[2], "imgClose"));
        var lblError = new voltmx.ui.Label(extendConfig({
            "centerX": "55%",
            "centerY": "50%",
            "height": "100%",
            "id": "lblError",
            "isVisible": true,
            "left": "0dp",
            "skin": "CopydefLabel0h1461925391e41",
            "text": "Incorrect Username/Password",
            "top": "0dp",
            "width": "80%",
            "zIndex": 1
        }, controller.args[0], "lblError"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblError"), extendConfig({}, controller.args[2], "lblError"));
        flxError.add(imgClose, lblError);
        var lblUserName = new voltmx.ui.Label(extendConfig({
            "id": "lblUserName",
            "isVisible": true,
            "left": "77dp",
            "skin": "CopyLBL0e133e7b084af41",
            "text": "Username",
            "textStyle": {},
            "top": "100dp",
            "width": "100dp",
            "zIndex": 1
        }, controller.args[0], "lblUserName"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblUserName"), extendConfig({}, controller.args[2], "lblUserName"));
        var txtUserName = new voltmx.ui.TextBox2(extendConfig({
            "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
            "focusSkin": "CopyCopydefTextBoxFocus",
            "height": "40dp",
            "id": "txtUserName",
            "isVisible": true,
            "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
            "left": "77dp",
            "onDone": controller.AS_TextField_h5b84d0b2b244fcb808ef432f678bbdc,
            "placeholder": "Username",
            "secureTextEntry": false,
            "skin": "CopyTXT",
            "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
            "top": "7dp",
            "width": "346dp",
            "zIndex": 1
        }, controller.args[0], "txtUserName"), extendConfig({
            "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [3, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "txtUserName"), extendConfig({
            "autoCorrect": false,
            "placeholderSkin": "CopyTXT1"
        }, controller.args[2], "txtUserName"));
        var lblPassword = new voltmx.ui.Label(extendConfig({
            "id": "lblPassword",
            "isVisible": true,
            "left": "77dp",
            "skin": "CopyLBL0e133e7b084af41",
            "text": "Password",
            "textStyle": {},
            "top": "15dp",
            "width": "100dp",
            "zIndex": 1
        }, controller.args[0], "lblPassword"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblPassword"), extendConfig({}, controller.args[2], "lblPassword"));
        var txtPassword = new voltmx.ui.TextBox2(extendConfig({
            "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
            "focusSkin": "CopyCopydefTextBoxFocus",
            "height": "40dp",
            "id": "txtPassword",
            "isVisible": true,
            "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
            "left": "77dp",
            "onDone": controller.AS_TextField_a64616d60b2042eb9f431ecfbbbb2720,
            "placeholder": "Password",
            "secureTextEntry": true,
            "skin": "CopyTXT",
            "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
            "top": "7dp",
            "width": "346dp",
            "zIndex": 1
        }, controller.args[0], "txtPassword"), extendConfig({
            "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [3, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "txtPassword"), extendConfig({
            "autoCorrect": false,
            "placeholderSkin": "CopyTXT1"
        }, controller.args[2], "txtPassword"));
        var lblRememberMe = new voltmx.ui.Label(extendConfig({
            "id": "lblRememberMe",
            "isVisible": true,
            "left": "77dp",
            "skin": "CopyCopyCopydefLabel3",
            "text": "Remember Me",
            "textStyle": {},
            "top": "15dp",
            "width": "99dp",
            "zIndex": 1
        }, controller.args[0], "lblRememberMe"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblRememberMe"), extendConfig({}, controller.args[2], "lblRememberMe"));
        var flxCheck = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "20dp",
            "id": "flxCheck",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "183dp",
            "isModalContainer": false,
            "onClick": controller.AS_FlexContainer_d2f4729b51c14799859cbdc815b94d6c,
            "skin": "CopyCopyslFbox0h4d4da20a38d49",
            "top": "-19dp",
            "width": "20dp",
            "zIndex": 1,
            "appName": "rentokilUi"
        }, controller.args[0], "flxCheck"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flxCheck"), extendConfig({}, controller.args[2], "flxCheck"));
        flxCheck.setDefaultUnit(voltmx.flex.DP);
        var imgCHeckBox = new voltmx.ui.Image2(extendConfig({
            "centerX": "48%",
            "centerY": "50%",
            "height": "12dp",
            "id": "imgCHeckBox",
            "isVisible": true,
            "skin": "slImage",
            "src": "tick_1.png",
            "width": "12dp",
            "zIndex": 1
        }, controller.args[0], "imgCHeckBox"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgCHeckBox"), extendConfig({}, controller.args[2], "imgCHeckBox"));
        flxCheck.add(imgCHeckBox);
        var btnCantLogin = new voltmx.ui.Button(extendConfig({
            "bottom": "5dp",
            "focusSkin": "CopyButtonLinkFocusSkin",
            "height": "25dp",
            "id": "btnCantLogin",
            "isVisible": true,
            "right": "77dp",
            "skin": "CopyButtonLinkNormalSkin",
            "text": "Can't Login?",
            "top": "-22dp",
            "width": "85dp",
            "zIndex": 1
        }, controller.args[0], "btnCantLogin"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnCantLogin"), extendConfig({
            "hoverSkin": "CopyButtonLinkFocusSkin"
        }, controller.args[2], "btnCantLogin"));
        var ButtonLogin = new voltmx.ui.Button(extendConfig({
            "focusSkin": "CopyButtonSkinActive",
            "height": "40dp",
            "id": "ButtonLogin",
            "isVisible": true,
            "left": "77dp",
            "onClick": controller.AS_Button_e97bf980d28c40d18193b23c5b59fe1e,
            "skin": "CopyButtonSkinNormal",
            "text": "Login",
            "top": "15dp",
            "width": "346dp",
            "zIndex": 1
        }, controller.args[0], "ButtonLogin"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "ButtonLogin"), extendConfig({
            "hoverSkin": "CopyButtonSkinActive"
        }, controller.args[2], "ButtonLogin"));
        var btnOpenNewAcnt = new voltmx.ui.Button(extendConfig({
            "focusSkin": "CopyButtonLinkFocusSkin",
            "height": "25dp",
            "id": "btnOpenNewAcnt",
            "isVisible": true,
            "left": "77dp",
            "skin": "CopyButtonLinkNormalSkin",
            "text": "Open New Account",
            "top": "15dp",
            "width": "128dp",
            "zIndex": 1
        }, controller.args[0], "btnOpenNewAcnt"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnOpenNewAcnt"), extendConfig({
            "hoverSkin": "CopyButtonLinkFocusSkin"
        }, controller.args[2], "btnOpenNewAcnt"));
        var btnEnrol = new voltmx.ui.Button(extendConfig({
            "bottom": "5dp",
            "focusSkin": "CopyButtonLinkFocusSkin",
            "height": "25dp",
            "id": "btnEnrol",
            "isVisible": true,
            "right": "77dp",
            "skin": "CopyButtonLinkNormalSkin",
            "text": "Enroll",
            "top": "-25dp",
            "width": "40dp",
            "zIndex": 1
        }, controller.args[0], "btnEnrol"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "displayText": true,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "btnEnrol"), extendConfig({
            "hoverSkin": "CopyButtonLinkFocusSkin"
        }, controller.args[2], "btnEnrol"));
        flxLoginWrapper.add(flxError, lblUserName, txtUserName, lblPassword, txtPassword, lblRememberMe, flxCheck, btnCantLogin, ButtonLogin, btnOpenNewAcnt, btnEnrol);
        Login.add(lblTopShadow, lblLeftShadow, lblBottomShadow, lblRightShadow, flxLoginWrapper);
        return Login;
    }
});
define("com/viz/Header1/userHeader1Controller", [],function() {
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

define('com/viz/Header1/Header1',[],function() {
    return function(controller) {
        var Header1 = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "isMaster": true,
            "height": "10%",
            "id": "Header1",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0%",
            "isModalContainer": false,
            "skin": "defDataPanelHeaderFlex",
            "top": "0%",
            "width": "100%",
            "onBreakpointHandler": onBreakpointHandler,
            "breakpoints": [640, 1024, 1366],
            "appName": "rentokilUi"
        }, controller.args[0], "Header1"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "Header1"), extendConfig({}, controller.args[2], "Header1"));
        Header1.setDefaultUnit(voltmx.flex.DP);
        var imgHamburgerMenu = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "50%",
            "id": "imgHamburgerMenu",
            "isVisible": true,
            "left": "10%",
            "skin": "slImage",
            "src": "header_logo.png",
            "width": "5%"
        }, controller.args[0], "imgHamburgerMenu"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgHamburgerMenu"), extendConfig({}, controller.args[2], "imgHamburgerMenu"));
        var flexRight = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "100%",
            "id": "flexRight",
            "isVisible": true,
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "reverseLayoutDirection": true,
            "isModalContainer": false,
            "right": "10%",
            "skin": "slFbox",
            "width": "270dp",
            "appName": "rentokilUi"
        }, controller.args[0], "flexRight"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flexRight"), extendConfig({}, controller.args[2], "flexRight"));
        flexRight.setDefaultUnit(voltmx.flex.DP);
        var flexLogout = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "centerY": "50%",
            "clipBounds": true,
            "height": "55%",
            "id": "flexLogout",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "8dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "width": "110dp",
            "appName": "rentokilUi"
        }, controller.args[0], "flexLogout"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "flexLogout"), extendConfig({}, controller.args[2], "flexLogout"));
        flexLogout.setDefaultUnit(voltmx.flex.DP);
        var lblLogout = new voltmx.ui.Label(extendConfig({
            "centerY": "50%",
            "id": "lblLogout",
            "isVisible": true,
            "left": "50dp",
            "skin": "defDataPanelLabelNormalDW",
            "text": "Logout",
            "width": voltmx.flex.USE_PREFERRED_SIZE
        }, controller.args[0], "lblLogout"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
            "padding": [0, 0, 1, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblLogout"), extendConfig({}, controller.args[2], "lblLogout"));
        var imgLogout = new voltmx.ui.Image2(extendConfig({
            "centerY": "50%",
            "height": "100%",
            "id": "imgLogout",
            "isVisible": true,
            "left": "15dp",
            "skin": "slImage",
            "src": "logout.png",
            "width": "20%"
        }, controller.args[0], "imgLogout"), extendConfig({
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "imgLogout"), extendConfig({}, controller.args[2], "imgLogout"));
        flexLogout.add(lblLogout, imgLogout);
        var lblUserName = new voltmx.ui.Label(extendConfig({
            "height": "100%",
            "id": "lblUserName",
            "isVisible": true,
            "right": "0dp",
            "skin": "defDataPanelLabelNormalDW",
            "text": "User name",
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE
        }, controller.args[0], "lblUserName"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "padding": [0, 0, 1, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblUserName"), extendConfig({}, controller.args[2], "lblUserName"));
        var lblWelcome = new voltmx.ui.Label(extendConfig({
            "height": "100%",
            "id": "lblWelcome",
            "isVisible": true,
            "right": "1dp",
            "skin": "defDataPanelWelcomeLblDW",
            "text": "Welcome,",
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE
        }, controller.args[0], "lblWelcome"), extendConfig({
            "contentAlignment": constants.CONTENT_ALIGN_CENTER,
            "padding": [0, 0, 1, 0],
            "paddingInPixel": false
        }, controller.args[1], "lblWelcome"), extendConfig({}, controller.args[2], "lblWelcome"));
        flexRight.add(flexLogout, lblUserName, lblWelcome);
        Header1.add(imgHamburgerMenu, flexRight);
        Header1.breakpointResetData = {};
        Header1.breakpointData = {
            maxBreakpointWidth: 1366,
            "640": {
                "imgHamburgerMenu": {
                    "left": {
                        "type": "string",
                        "value": "5%"
                    },
                    "segmentProps": []
                },
                "flexRight": {
                    "right": {
                        "type": "string",
                        "value": "5%"
                    },
                    "segmentProps": []
                },
                "flexLogout": {
                    "skin": "",
                    "width": {
                        "type": "string",
                        "value": "30dp"
                    },
                    "segmentProps": []
                },
                "lblLogout": {
                    "isVisible": false,
                    "segmentProps": []
                },
                "imgLogout": {
                    "left": {
                        "type": "string",
                        "value": "10dp"
                    },
                    "width": {
                        "type": "string",
                        "value": "18dp"
                    },
                    "segmentProps": []
                },
                "lblUserName": {
                    "isVisible": false,
                    "segmentProps": []
                },
                "lblWelcome": {
                    "isVisible": false,
                    "segmentProps": []
                }
            },
            "1024": {
                "imgHamburgerMenu": {
                    "left": {
                        "type": "string",
                        "value": "5%"
                    },
                    "segmentProps": []
                },
                "flexRight": {
                    "right": {
                        "type": "string",
                        "value": "5%"
                    },
                    "segmentProps": []
                },
                "flexLogout": {
                    "skin": "defDataPanelLogoutFlexDW",
                    "segmentProps": []
                }
            },
            "1366": {
                "flexLogout": {
                    "skin": "defDataPanelLogoutFlexDW",
                    "segmentProps": []
                }
            }
        }
        Header1.compInstData = {}
        return Header1;
    }
});
define("servicepage/servicePage/userservicePageController", [],function() {
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

define('servicepage/servicePage/servicePage',[],function() {
    return function(controller) {
        var servicePage = new voltmx.ui.FlexContainer(extendConfig({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": false,
            "isMaster": true,
            "focusSkin": "slFFocusbox",
            "height": "100%",
            "id": "servicePage",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "left": "0dp",
            "isModalContainer": false,
            "skin": "slFbox",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1,
            "onBreakpointHandler": onBreakpointHandler,
            "breakpoints": [640, 1024, 1366],
            "appName": "rentokilUi"
        }, controller.args[0], "servicePage"), extendConfig({
            "paddingInPixel": false
        }, controller.args[1], "servicePage"), extendConfig({}, controller.args[2], "servicePage"));
        servicePage.setDefaultUnit(voltmx.flex.DP);
        var TPW0fb1b8c574cbb48 = new kony.ui.CustomWidget(extendConfig({
            "id": "TPW0fb1b8c574cbb48",
            "isVisible": true,
            "left": "0",
            "top": "0",
            "width": "100%",
            "height": "100%",
            "clipBounds": false
        }, controller.args[0], "TPW0fb1b8c574cbb48"), extendConfig({
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, controller.args[1], "TPW0fb1b8c574cbb48"), extendConfig({
            "widgetName": "servicePage"
        }, controller.args[2], "TPW0fb1b8c574cbb48"));
        servicePage.add(TPW0fb1b8c574cbb48);
        servicePage.compInstData = {}
        return servicePage;
    }
});
define('servicepage/servicePage/servicePageConfig',[],function() {
    return {
        "properties": [],
        "apis": [],
        "events": []
    }
});
define("flxSampleRowTemplate", [],function() {
    return function(controller) {
        var flxSampleRowTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "75dp",
            "id": "flxSampleRowTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleRowTemplate",
            "width": "100%",
            "appName": "rentokilUi"
        }, {
            "paddingInPixel": false
        }, {});
        flxSampleRowTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknLblRowHeading",
            "text": "Heading",
            "textStyle": {},
            "top": "8.00%",
            "width": "45%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblDescription = new voltmx.ui.Label({
            "bottom": "10%",
            "id": "lblDescription",
            "isVisible": true,
            "left": "4%",
            "maxNumberOfLines": 3,
            "maxWidth": "70%",
            "skin": "sknLblDescription",
            "text": "Sub-Heading",
            "textStyle": {},
            "textTruncatePosition": constants.TEXT_TRUNCATE_NONE,
            "top": "42%",
            "width": "70%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_TOP_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblTime = new voltmx.ui.Label({
            "id": "lblTime",
            "isVisible": true,
            "right": "9%",
            "skin": "sknLblTimeStamp",
            "text": "Timestamp",
            "textStyle": {},
            "top": "10%",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblStrip = new voltmx.ui.Label({
            "height": "100%",
            "id": "lblStrip",
            "isVisible": true,
            "left": "0dp",
            "maxWidth": "1%",
            "skin": "sknLblStrip",
            "textStyle": {},
            "top": "0dp",
            "width": voltmx.flex.USE_PREFERRED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxSampleRowTemplate.add(lblHeading, lblDescription, lblTime, lblStrip);
        return flxSampleRowTemplate;
    }
});
define("flxSectionHeaderTemplate", [],function() {
    return function(controller) {
        var flxSectionHeaderTemplate = new voltmx.ui.FlexContainer({
            "autogrowMode": voltmx.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "45dp",
            "id": "flxSectionHeaderTemplate",
            "isVisible": true,
            "layoutType": voltmx.flex.FREE_FORM,
            "isModalContainer": false,
            "skin": "sknSampleSectionHeaderTemplate",
            "width": "100%",
            "appName": "rentokilUi"
        }, {
            "paddingInPixel": false
        }, {});
        flxSectionHeaderTemplate.setDefaultUnit(voltmx.flex.DP);
        var lblHeading = new voltmx.ui.Label({
            "centerY": "50%",
            "id": "lblHeading",
            "isVisible": true,
            "left": "4%",
            "maxWidth": "50%",
            "skin": "sknSectionHeaderLabelSkin",
            "text": "Heading",
            "textStyle": {},
            "width": "75%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxSectionHeaderTemplate.add(lblHeading);
        return flxSectionHeaderTemplate;
    }
});
define("userflxSampleRowTemplateController", {
    //Type your controller code here 
});
define("flxSampleRowTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("flxSampleRowTemplateController", ["userflxSampleRowTemplateController", "flxSampleRowTemplateControllerActions"], function() {
    var controller = require("userflxSampleRowTemplateController");
    var controllerActions = ["flxSampleRowTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("userflxSectionHeaderTemplateController", {
    //Type your controller code here 
});
define("flxSectionHeaderTemplateControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
});
define("flxSectionHeaderTemplateController", ["userflxSectionHeaderTemplateController", "flxSectionHeaderTemplateControllerActions"], function() {
    var controller = require("userflxSectionHeaderTemplateController");
    var controllerActions = ["flxSectionHeaderTemplateControllerActions"];
    return voltmx.visualizer.mixinControllerActions(controller, controllerActions);
});

define("navigation/NavigationModel", { 
    "Application": {},
    "Forms" : {},
    "UIModules" : {}
});
define("navigation/NavigationController", {
    //Add your navigation controller code here.
});

require(['applicationController','com/konymp/Login/LoginController','com/konymp/Login/Login','com/viz/Header1/Header1Controller','com/viz/Header1/Header1','servicepage/servicePage/servicePageController','servicepage/servicePage/servicePage','servicepage/servicePage/servicePageConfig','flxSampleRowTemplate','flxSectionHeaderTemplate','flxSampleRowTemplateController','flxSectionHeaderTemplateController','navigation/NavigationModel','navigation/NavigationController'], function(){});
define("sparequirefileslist", function(){});


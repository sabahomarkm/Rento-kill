define(function() {
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
})
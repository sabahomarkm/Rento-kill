define("Form1", function() {
    return function(controller) {
        function addWidgetsForm1() {
            this.setDefaultUnit(voltmx.flex.DP);
            var FlexContainer0b710f38ad44c49 = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "47.36%",
                "centerY": "49.11%",
                "clipBounds": false,
                "height": "72.22%",
                "id": "FlexContainer0b710f38ad44c49",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "CopyslFbox0iff35e44025244",
                "top": "0dp",
                "width": "37.58%",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            FlexContainer0b710f38ad44c49.setDefaultUnit(voltmx.flex.DP);
            var FlexContainer0db1b7850382749 = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "clipBounds": false,
                "focusSkin": "slFFocusbox",
                "height": "250dp",
                "id": "FlexContainer0db1b7850382749",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "CopyslFbox0e45463efdf0147",
                "top": "0dp",
                "width": "100.00%",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            FlexContainer0db1b7850382749.setDefaultUnit(voltmx.flex.DP);
            var Image0g3cac89868054a = new voltmx.ui.Image2({
                "centerX": "50%",
                "centerY": "50%",
                "zoomEnabled": false,
                "height": "120dp",
                "id": "Image0g3cac89868054a",
                "imageWhenFailed": "camera_normal.png",
                "isVisible": true,
                "left": "240dp",
                "skin": "CopyslImage0d310465f922d49",
                "src": "rentokil_logo_2.webp",
                "top": "40dp",
                "width": "270dp",
                "zIndex": 1
            }, {
                "imageScaleMode": constants.IMAGE_SCALE_MODE_CROP,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0db1b7850382749.add(Image0g3cac89868054a);
            var FlexContainer0d3e864d3a0be4b = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "bottom": "-2dp",
                "centerX": "50.00%",
                "clipBounds": false,
                "height": "350dp",
                "id": "FlexContainer0d3e864d3a0be4b",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "isModalContainer": false,
                "skin": "CopyslFbox0f31333b7526c49",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            FlexContainer0d3e864d3a0be4b.setDefaultUnit(voltmx.flex.DP);
            var txtUserName = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "height": "40dp",
                "id": "txtUserName",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "130dp",
                "onTextChange": controller.AS_TextField_bdfbcb78e99c4d45bba2ecaa2e370b05,
                "secureTextEntry": false,
                "skin": "CopydefTextBoxNormal0e962dea6d4014a",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "62dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "autoCorrect": false,
                "placeholderSkin": "defTextBoxPlaceholder"
            });
            var txtPassword = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "focusSkin": "defTextBoxFocus",
                "height": "40dp",
                "id": "txtPassword",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "130dp",
                "onTextChange": controller.AS_TextField_a28d55e44f554f86b7bbd3ca6a35f520,
                "secureTextEntry": true,
                "skin": "CopydefTextBoxNormal0e165aff13fc14c",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "189dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "containerHeightMode": constants.TEXTBOX_FONT_METRICS_DRIVEN_HEIGHT,
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [3, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "autoCorrect": false,
                "placeholderSkin": "defTextBoxPlaceholder"
            });
            var Button0ca746dfef44446 = new voltmx.ui.Button({
                "height": "50dp",
                "id": "Button0ca746dfef44446",
                "isVisible": true,
                "left": "130dp",
                "onClick": controller.AS_Button_cffc8bcf540d4bca8829ea3dbd05bb6a,
                "skin": "CopydefBtnNormal0g3fee836bd4543",
                "text": "Login",
                "top": "240dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Label0abeff8932e234e = new voltmx.ui.Label({
                "id": "Label0abeff8932e234e",
                "isVisible": true,
                "left": "130dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Email",
                "top": "20dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyLabel0j8df0809b2ba42 = new voltmx.ui.Label({
                "id": "CopyLabel0j8df0809b2ba42",
                "isVisible": true,
                "left": "130dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Password",
                "top": "140dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0d3e864d3a0be4b.add(txtUserName, txtPassword, Button0ca746dfef44446, Label0abeff8932e234e, CopyLabel0j8df0809b2ba42);
            FlexContainer0b710f38ad44c49.add(FlexContainer0db1b7850382749, FlexContainer0d3e864d3a0be4b);
            this.compInstData = {}
            this.add(FlexContainer0b710f38ad44c49);
        };
        return [{
            "addWidgets": addWidgetsForm1,
            "enabledForIdleTimeout": false,
            "id": "Form1",
            "layoutType": voltmx.flex.FREE_FORM,
            "needAppMenu": false,
            "skin": "CopyslForm0d0343c4f10864e",
            "onBreakpointHandler": onBreakpointHandler,
            "breakpoints": [640, 1024, 1366],
            "appName": "rentokilUi",
            "preShow": function(eventobject) {
                controller.AS_Form_b149e0a67b9941b0be953a426fea272e(eventobject);
                voltmx.visualizer.syncComponentInstanceDataCache(eventobject);
            },
            "info": {
                "kuid": "ge157d15db964749ba5db5b484a747d3"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FREE_FORM,
            "paddingInPixel": false
        }, {
            "retainScrollPosition": false
        }]
    }
});
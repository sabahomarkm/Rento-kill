define("Form2", function() {
    return function(controller) {
        function addWidgetsForm2() {
            this.setDefaultUnit(voltmx.flex.DP);
            var Flexheader = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "clipBounds": false,
                "height": "120dp",
                "id": "Flexheader",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "CopyslFbox0b95575816def48",
                "top": "0dp",
                "width": "100.00%",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            Flexheader.setDefaultUnit(voltmx.flex.DP);
            var Logo = new voltmx.ui.Label({
                "id": "Logo",
                "isVisible": true,
                "left": "67dp",
                "skin": "CopydefLabel0cb9afd4fdfd945",
                "text": "Rentokil",
                "top": "42dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Button0b0b270a70ae742 = new voltmx.ui.Button({
                "height": "50dp",
                "id": "Button0b0b270a70ae742",
                "isVisible": true,
                "onClick": controller.AS_Button_ga79bca28539434a990d3bcc264f7a19,
                "right": "10px",
                "skin": "CopydefBtnNormal0f39bde99a20241",
                "text": "Logout",
                "top": "34dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Button0b4f35962674744 = new voltmx.ui.Button({
                "height": "50dp",
                "id": "Button0b4f35962674744",
                "isVisible": true,
                "onClick": controller.AS_Button_de218f48466f44878d4eb3ef736ed65a,
                "right": "350px",
                "skin": "CopydefBtnNormal0a9d15e4be87c48",
                "text": "About us",
                "top": "36dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            Flexheader.add(Logo, Button0b0b270a70ae742, Button0b4f35962674744);
            var FlexContainerBanner = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "48.32%",
                "clipBounds": false,
                "height": "340dp",
                "id": "FlexContainerBanner",
                "isVisible": true,
                "layoutType": voltmx.flex.FLOW_VERTICAL,
                "left": "0dp",
                "isModalContainer": false,
                "skin": "CopyslFbox0d8324630c75d45",
                "top": "0dp",
                "width": "103.25%",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            FlexContainerBanner.setDefaultUnit(voltmx.flex.DP);
            var Label0c322e6a7b7af49 = new voltmx.ui.Label({
                "bottom": 5,
                "centerX": "50%",
                "id": "Label0c322e6a7b7af49",
                "isVisible": true,
                "skin": "CopydefLabel0c263d6ce718b46",
                "text": "Pest Management Portal",
                "top": "5dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyLabel0b0afdfe4bb9348 = new voltmx.ui.Label({
                "bottom": 5,
                "centerX": "50%",
                "id": "CopyLabel0b0afdfe4bb9348",
                "isVisible": true,
                "skin": "CopydefLabel0bcf7c4cf382e48",
                "text": "Book Your Pest Control Service",
                "top": "5dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyLabel0icd36823cde048 = new voltmx.ui.Label({
                "centerX": "50%",
                "id": "CopyLabel0icd36823cde048",
                "isVisible": true,
                "skin": "CopydefLabel0cd87c40ac2be4e",
                "text": "professional, and certified pest control services. Fill in the form below to get started.",
                "top": "0dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainerBanner.add(Label0c322e6a7b7af49, CopyLabel0b0afdfe4bb9348, CopyLabel0icd36823cde048);
            var FlexContainerFormParent = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "bottom": "0dp",
                "centerX": "46.85%",
                "clipBounds": false,
                "height": "830dp",
                "id": "FlexContainerFormParent",
                "isVisible": true,
                "layoutType": voltmx.flex.FREE_FORM,
                "left": "3dp",
                "isModalContainer": false,
                "skin": "CopyslFbox0b60f3294f4af48",
                "top": "30dp",
                "width": "100.28%",
                "zIndex": 1,
                "appName": "rentokilUi"
            }, {
                "paddingInPixel": false
            }, {});
            FlexContainerFormParent.setDefaultUnit(voltmx.flex.DP);
            var FlexContainer0b710f38ad44c49 = new voltmx.ui.FlexContainer({
                "autogrowMode": voltmx.flex.AUTOGROW_NONE,
                "centerX": "50%",
                "centerY": "36.10%",
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
                "height": "70dp",
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
            var Label0he93a0974ab44c = new voltmx.ui.Label({
                "centerX": "50%",
                "centerY": "50%",
                "id": "Label0he93a0974ab44c",
                "isVisible": true,
                "skin": "CopydefLabel0d2b49bb6d7684c",
                "text": "Book service",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0db1b7850382749.add(Label0he93a0974ab44c);
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
            var Label0abeff8932e234e = new voltmx.ui.Label({
                "id": "Label0abeff8932e234e",
                "isVisible": true,
                "left": "130dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Service",
                "top": "-140dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyLabel0bdca95db35d64e = new voltmx.ui.Label({
                "id": "CopyLabel0bdca95db35d64e",
                "isVisible": true,
                "left": "130dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Type",
                "top": "-60dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var CopyLabel0i94354e8268a4e = new voltmx.ui.Label({
                "id": "CopyLabel0i94354e8268a4e",
                "isVisible": true,
                "left": "130dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Name",
                "top": "90dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0d3e864d3a0be4b.add(Label0abeff8932e234e, CopyLabel0bdca95db35d64e, CopyLabel0i94354e8268a4e);
            var ServiceDate = new voltmx.ui.Label({
                "id": "ServiceDate",
                "isVisible": true,
                "left": "130dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Service date",
                "top": "274dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Calendar0b685aef7fd454a = new voltmx.ui.Calendar({
                "calendarIcon": "calbtn.png",
                "dateComponents": [24, 4, 2026],
                "dateFormat": "dd/MM/yyyy",
                "day": 24,
                "formattedDate": "24/04/2026",
                "height": "27dp",
                "hour": 0,
                "id": "Calendar0b685aef7fd454a",
                "isVisible": true,
                "left": "122dp",
                "minutes": 0,
                "month": 4,
                "seconds": 0,
                "skin": "slCalendar",
                "top": "305dp",
                "viewType": constants.CALENDAR_VIEW_TYPE_DEFAULT,
                "width": "240dp",
                "year": 2026,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "noOfMonths": 1
            });
            var Username = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "focusSkin": "defTextBoxFocus",
                "height": "28dp",
                "id": "Username",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "131dp",
                "onTextChange": controller.AS_TextField_hdd24c92d032445588a7d3cb97ce30aa,
                "secureTextEntry": false,
                "skin": "CopydefTextBoxNormal0e165aff13fc14c",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "381dp",
                "width": "230dp",
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
            var CopyLabel0eeb73287a8a042 = new voltmx.ui.Label({
                "id": "CopyLabel0eeb73287a8a042",
                "isVisible": true,
                "left": "135dp",
                "skin": "CopydefLabel0jfc9d6fab51840",
                "text": "Address",
                "top": "418dp",
                "width": voltmx.flex.USE_PREFERRED_SIZE,
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            var Address = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "height": "28dp",
                "id": "Address",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "135dp",
                "onTextChange": controller.AS_TextField_e008f4a8007641228a0334cbc99573e3,
                "secureTextEntry": false,
                "skin": "CopydefTextBoxNormal0e962dea6d4014a",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "458dp",
                "width": "230dp",
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
            var serviceName = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "focusSkin": "defTextBoxFocus",
                "height": "28dp",
                "id": "serviceName",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "122dp",
                "onTextChange": controller.AS_TextField_f1c8b213f6f34d42a1b9624f798fea12,
                "secureTextEntry": false,
                "skin": "CopydefTextBoxNormal0e165aff13fc14c",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "150dp",
                "width": "230dp",
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
            var TypeName = new voltmx.ui.TextBox2({
                "autoCapitalize": constants.TEXTBOX_AUTO_CAPITALIZE_NONE,
                "focusSkin": "defTextBoxFocus",
                "height": "28dp",
                "id": "TypeName",
                "isVisible": true,
                "keyBoardStyle": constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT,
                "left": "122dp",
                "onTextChange": controller.AS_TextField_a22caf24b87b4208a5510675b2fbb249,
                "secureTextEntry": false,
                "skin": "CopydefTextBoxNormal0e165aff13fc14c",
                "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
                "top": "220dp",
                "width": "230dp",
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
                "left": "92dp",
                "onClick": controller.AS_Button_g7c8156731514d52bff6b2374f0db80e,
                "skin": "CopydefBtnNormal0g3fee836bd4543",
                "text": "Book service",
                "top": "520dp",
                "width": "300dp",
                "zIndex": 1
            }, {
                "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                "displayText": true,
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {});
            FlexContainer0b710f38ad44c49.add(FlexContainer0db1b7850382749, FlexContainer0d3e864d3a0be4b, ServiceDate, Calendar0b685aef7fd454a, Username, CopyLabel0eeb73287a8a042, Address, serviceName, TypeName, Button0ca746dfef44446);
            FlexContainerFormParent.add(FlexContainer0b710f38ad44c49);
            this.compInstData = {}
            this.add(Flexheader, FlexContainerBanner, FlexContainerFormParent);
        };
        return [{
            "addWidgets": addWidgetsForm2,
            "enabledForIdleTimeout": false,
            "id": "Form2",
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "needAppMenu": false,
            "skin": "CopyslForm0h99e6a152f7a49",
            "onBreakpointHandler": onBreakpointHandler,
            "breakpoints": [640, 1024, 1366],
            "appName": "rentokilUi",
            "info": {
                "kuid": "ac7c5805f2794dd994fe7ed2ddc50302"
            }
        }, {
            "displayOrientation": constants.FORM_DISPLAY_ORIENTATION_PORTRAIT,
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            "paddingInPixel": false
        }, {
            "retainScrollPosition": false
        }]
    }
});
define(function() {
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
})
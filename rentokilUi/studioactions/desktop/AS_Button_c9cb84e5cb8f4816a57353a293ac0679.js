function AS_Button_c9cb84e5cb8f4816a57353a293ac0679(eventobject) {
    var self = this;

    function INVOKE_OBJECT_SERVICE_ide_onClick_i2d8475c1ab1423db77d3baf17fe65f6_Callback(pest_control_bookings) {}
    if (pest_control_bookings_inputparam == undefined) {
        var pest_control_bookings_inputparam = {};
    }
    pest_control_bookings_inputparam["serviceID"] = "rentokilApiServices$pest_control_bookings$create";
    pest_control_bookings_inputparam["options"] = {
        "access": "online",
        "CRUD_TYPE": "create"
    };
    var data = {};
    data["name"] = self.view.Username.text;
    data["address"] = self.view.Address.text;
    data["service"] = self.view.serviceName.text;
    data["type"] = self.view.TypeName.text;
    pest_control_bookings_inputparam["options"]["data"] = data;
    var pest_control_bookings_httpheaders = {};
    pest_control_bookings_inputparam["httpheaders"] = pest_control_bookings_httpheaders;
    var pest_control_bookings_httpconfigs = {};
    pest_control_bookings_inputparam["httpconfig"] = pest_control_bookings_httpconfigs;
    rentokilApiServices$pest_control_bookings$create = mfobjectsecureinvokerasync(pest_control_bookings_inputparam, "rentokilApiServices", "pest_control_bookings", INVOKE_OBJECT_SERVICE_ide_onClick_i2d8475c1ab1423db77d3baf17fe65f6_Callback);
}
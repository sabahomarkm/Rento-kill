voltmx.visualizer = {};
voltmx.visualizer.actions = {};

function displayMWError() {
    voltmx.ui.Alert("Middleware Error ", null, "error", null, null);
};

function displaySessionError() {
    voltmx.ui.Alert("Session Expired .. Please re-login", null, "error", null, null);
};

function displayError(code, msg) {
    // Commented for SWA: voltmx.ui.Alert("Error Code: "..code .." Message: " ..msg,null,"error",null,null);
    voltmx.ui.Alert(code + "- " + msg, null, "error", null, null);
};
var mergeHeaders = function(httpHeaders, globalHeaders) {
    for (var attrName in globalHeaders) {
        httpHeaders[attrName] = globalHeaders[attrName];
    }
    return httpHeaders;
};

function appmiddlewareinvokerasync(inputParam, callBack) {
    var url = appConfig.url;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam.httpheaders = globalhttpheaders;
        };
    };
    var connHandle = _invokeServiceAsyncForMF_(url, inputParam, callBack);
    return connHandle;
};

function appmiddlewaresecureinvokerasync(inputParam, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = globalhttpheaders;
        };
    };
    var connHandle = _invokeServiceAsyncForMF_(url, inputParam, callBack);
    return connHandle;
};

function mfgetidentityservice(idProviderName) {
    var currentInstance = voltmx.sdk.getCurrentInstance();
    if (!currentInstance) {
        throw new Exception("INIT_FAILURE", "Please call init before getting identity provider");
    }
    return currentInstance.getIdentityService(idProviderName);
};
/**
 * @function mfidentityserviceinvoker
 * @description Invokes identity service
 * @public
 * @param {string} idProviderName
 * @param {object} params {userid : <userid>, password : <password>, browserWidget : <browserwidget>, operation : "login/logout"}
 * and other optional params like callerID and custom params in case of custom provider.
 * @param {function} successCallback
 * @param {function} failureCallback
 */
function mfidentityserviceinvoker(idProviderName, params, successCallback, failureCallback) {
    var authorizationClient = mfgetidentityservice(idProviderName);
    voltmx.print("Invoking identity service " + idProviderName + " through Foundry.");
    if (!params.operation || params.operation == "login") {
        authorizationClient.login(params, successCallback, failureCallback);
    } else {
        authorizationClient.logout(successCallback, failureCallback, params);
    }
};

function mfintegrationsecureinvokerasync(inputParam, serviceID, operationID, callBack) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    voltmx.print("Async : Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
    if (voltmx.mbaas) {
        voltmx.mbaas.invokeMbaasServiceFromVoltmx(url, inputParam, serviceID, operationID, callBack);
    } else {
        alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the HCL Volt MX Cloud Console and add as module to the HCL Project.");
    }
};

function mfintegrationsecureinvokersync(inputParam, serviceID, operationID) {
    var url = appConfig.secureurl;
    var sessionIdKey = "cacheid";
    var resulttable;
    inputParam.appID = appConfig.appId;
    inputParam.appver = appConfig.appVersion;
    inputParam["channel"] = "wap";
    inputParam["platform"] = voltmx.os.deviceInfo().name;
    inputParam[sessionIdKey] = sessionID;
    if (globalhttpheaders) {
        if (inputParam["httpheaders"]) {
            inputParam.httpheaders = mergeHeaders(inputParam.httpheaders, globalhttpheaders);
        } else {
            inputParam["httpheaders"] = mergeHeaders({}, globalhttpheaders);
        };
    };
    voltmx.print("Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
    if (voltmx.mbaas) {
        resulttable = voltmx.mbaas.invokeMbaasServiceFromVoltmxSync(url, inputParam, serviceID, operationID);
        voltmx.print("Result table for service id : " + serviceID + " operationid : " + operationID + " : " + JSON.stringify(resulttable));
    } else {
        alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the Iris Cloud Console and add as module to the Iris Project.");
    }
    return resulttable;
};
_invokeServiceAsyncForMF_ = function(url, inputParam, callBack, info) {
    var operationID = inputParam["serviceID"];
    if (!operationID) {
        resulttable = voltmx.net.invokeServiceAsync(url, inputParam, callBack, info);
    } else {
        var _mfServicesMap_ = {};
        voltmx.print("Getting serviceID for : " + operationID);
        var serviceID = _mfServicesMap_[operationID] && _mfServicesMap_[operationID]["servicename"];
        voltmx.print("Got serviceID for : " + operationID + " : " + serviceID);
        voltmx.print("Async : Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
        if (serviceID && operationID) {
            var url = appConfig.secureurl;
            if (voltmx.mbaas) {
                voltmx.mbaas.invokeMbaasServiceFromVoltmx(url, inputParam, serviceID, operationID, callBack, info);
            } else {
                alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the Iris Cloud Console and add as module to the Iris Project.");
            }
        } else {
            resulttable = voltmx.net.invokeServiceAsync(url, inputParam, callBack, info);
        }
    }
};
_invokeServiceSyncForMF_ = function(url, inputParam, isBlocking, info) {
    var resulttable;
    var operationID = inputParam["serviceID"];
    if (!operationID) {
        resulttable = voltmx.net.invokeService(url, inputParam, isBlocking);
    } else {
        var _mfServicesMap_ = {};
        voltmx.print("Getting serviceID for : " + operationID);
        var serviceID = _mfServicesMap_[operationID] && _mfServicesMap_[operationID]["servicename"];
        voltmx.print("Got serviceID for : " + operationID + " : " + serviceID);
        voltmx.print("Invoking service through Foundry with url : " + url + " service id : " + serviceID + " operationid : " + operationID + "\n input params" + JSON.stringify(inputParam));
        if (serviceID && operationID) {
            var url = appConfig.secureurl;
            if (voltmx.mbaas) {
                resulttable = voltmx.mbaas.invokeMbaasServiceFromVoltmxSync(url, inputParam, serviceID, operationID, info);
                voltmx.print("Result table for service id : " + serviceID + " operationid : " + operationID + " : " + JSON.stringify(resulttable));
            } else {
                alert("Unable to find the Foundry SDK for Iris. Please download the SDK from the Iris Console and add as module to the Iris.");
            }
        } else {
            resulttable = voltmx.net.invokeService(url, inputParam, isBlocking);
        }
    }
    return resulttable;
};
/*
   Sample invocation code
   var inputparam = {};
   inputparam.options = {
       "access": "online",
       "CRUD_TYPE": "get",//get/create..
       "odataurl": "$filter=UserId eq xxx",
       "data" : {a:1,b:2}//in case of create/update
   };
*/
function mfobjectsecureinvokerasync(inputParam, serviceID, objectID, callBack) {
    var options = {
        "access": inputParam.options.access
    };
    var serviceObj = voltmx.sdk.getCurrentInstance().getObjectService(serviceID, options);
    var CRUD_TYPE = inputParam.options.CRUD_TYPE;
    var dataObject = new voltmx.sdk.dto.DataObject(objectID);
    var headers = inputParam.httpheaders || {};
    switch (CRUD_TYPE) {
        case 'get':
            if (inputParam.options && inputParam.options.odataurl) dataObject.setOdataUrl(inputParam.options.odataurl.toString());
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.fetch(options, callBack, callBack);
            break;
        case 'create':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.create(options, callBack, callBack);
            break;
        case 'update':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.update(options, callBack, callBack);
            break;
        case 'partialupdate':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.partialUpdate(options, callBack, callBack);
            break;
        case 'delete':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.deleteRecord(options, callBack, callBack);
            break;
        case 'createBinary':
        case 'updateBinary':
        case 'deleteBinary':
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            var queryParams = inputParam.options && inputParam.options.queryParams || {};
            var binaryAttrName = inputParam.options && inputParam.options.binaryAttrName || "";
            options = {
                "dataObject": dataObject,
                "headers": headers,
                "queryParams": queryParams,
                "binaryAttrName": binaryAttrName
            };
            if (CRUD_TYPE === "createBinary") {
                serviceObj.createBinaryContent(options, callBack, callBack);
            } else if (CRUD_TYPE === "updateBinary") {
                serviceObj.updateBinaryContent(options, callBack, callBack);
            } else if (CRUD_TYPE === "deleteBinary") {
                serviceObj.deleteBinaryContent(options, callBack, callBack);
            }
            break;
        default:
            // Custom verbs
            var data = inputParam.options && inputParam.options.data || {};
            var key;
            for (key in data) {
                dataObject.addField(key, data[key]);
            }
            options = {
                "dataObject": dataObject,
                "headers": headers
            };
            serviceObj.customVerb(CRUD_TYPE, options, callBack, callBack);
    }
};

function callAppMenu() {};

function makeCall(eventobject) {
    voltmx.phone.dial(eventobject.text);
};

function initializeGlobalVariables() {};

function getSetterFinalPath(bdata, widgetId, model) {
    var setterBasePath = model;
    if (bdata[widgetId].parent) {
        setterBasePath = model[bdata[widgetId].parent];
    }
    var instanceId = bdata[widgetId].instanceId;
    var isSrcCompTopFlex = bdata[widgetId].isSrcCompTopFlex;
    if (instanceId && instanceId !== widgetId) {
        setterBasePath = setterBasePath[instanceId];
    }
    let parentWgtAccessPath = bdata[widgetId].parentWgtAccessPath;
    if (parentWgtAccessPath) {
        parentWgtAccessPath.forEach(function(parentId) {
            /**
             * Incase of real/normal children of tab pane widgets,
             * the parent param will be there and we are setting the setterBasePath 
             * with its parent model from the model, hence checking here if it is already 
             * the parent ignoring it before changing the setterBasePath
             */
            if (parentId !== setterBasePath.id) {
                setterBasePath = setterBasePath[parentId];
            }
        });
    }
    var setterFinalPath = setterBasePath;
    if (!isSrcCompTopFlex && model.id !== widgetId) {
        var splitArr = widgetId.split("."); //For components without contract instance, widget id will have '.'
        for (var i = 0; i < splitArr.length; i++) {
            if (!setterFinalPath) break;
            else if (setterFinalPath[splitArr[i]]) {
                setterFinalPath = setterFinalPath[splitArr[i]];
            }
        }
    }
    return setterFinalPath;
}

function setLocalizedSegmentData(model, data) {
    data = JSON.parse(JSON.stringify(data)) || [];
    for (var i = 0; i < data.length; i++) {
        var rowData = data[i];
        for (var prop in rowData) {
            if (rowData.hasOwnProperty(prop) && typeof rowData[prop] === "object") {
                if (rowData[prop]["i18nkey"]) {
                    rowData[prop]["text"] = kony.i18n.getLocalizedString(rowData[prop]["i18nkey"]);
                }
            }
        }
    }
    model.data = data;
}

function onBreakpointHandler(formModel, width) {
    var flexProps = ['left', 'top', 'right', 'bottom', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'zIndex', 'centerX', 'centerY', 'gutterX', 'gutterY'];
    if (formModel.compInstData) {
        var instData = formModel.compInstData;
        for (var widgetId in instData) {
            var setterFinalPath = getSetterFinalPath(instData, widgetId, formModel);
            if (setterFinalPath) {
                var wdata = {};
                for (var prop in instData[widgetId]) {
                    if (instData[widgetId].hasOwnProperty(prop)) {
                        wdata[prop] = instData[widgetId][prop];
                    }
                }
                var segmentProps = wdata.segmentProps || [];
                for (var prop in wdata) {
                    if (['parent', 'segmentProps'].indexOf(prop) >= 0) continue;
                    if (wdata['i18n_' + prop]) {
                        continue;
                    }
                    if (prop.indexOf("i18n_") >= 0) {
                        const propToUpdate = prop.substr("i18n_".length);
                        setterFinalPath[propToUpdate] = kony.i18n.getLocalizedString(wdata[prop]);
                    } else if (segmentProps.indexOf(prop) < 0) {
                        setterFinalPath[prop] = wdata[prop];
                    }
                }
                //For breakpoint specific template properties for segment, the order is important hence we are passing the properties in the array.
                segmentProps.forEach(function(prop) {
                    if (prop === "data") {
                        setLocalizedSegmentData(setterFinalPath, wdata[prop]);
                    } else {
                        setterFinalPath[prop] = wdata[prop];
                    }
                });
            }
        }
    }
    if (formModel.breakpointData) {
        var width = (width === constants.BREAKPOINT_MAX_VALUE) ? formModel.breakpointData.maxBreakpointWidth : width;
        if (formModel.breakpointData[width]) {
            var bdata = formModel.breakpointData[width];
            for (var widgetId in bdata) {
                var setterFinalPath = getSetterFinalPath(bdata, widgetId, formModel);
                if (setterFinalPath) {
                    var wdata = bdata[widgetId];
                    var segmentProps = wdata.segmentProps || [];
                    for (var prop in wdata) {
                        if (['parent', 'instanceId', 'isSrcCompTopFlex', 'segmentProps'].indexOf(prop) >= 0) {
                            continue
                        };
                        if (wdata['i18n_' + prop]) {
                            continue;
                        }
                        if (formModel.breakpointResetData && (typeof formModel.breakpointResetData[widgetId] === 'undefined' || typeof formModel.breakpointResetData[widgetId][prop] === 'undefined')) {
                            if (!formModel.breakpointResetData[widgetId]) {
                                formModel.breakpointResetData[widgetId] = {};
                            }
                            if (flexProps.indexOf(prop) > -1) {
                                formModel.breakpointResetData[widgetId][prop] = {};
                                formModel.breakpointResetData[widgetId][prop].value = setterFinalPath[prop];
                            } else {
                                if (prop === "data") {
                                    formModel.breakpointResetData[widgetId][prop] = setterFinalPath[prop] || [];
                                } else if (prop.indexOf("i18n_") >= 0) {
                                    const propToUpdate = prop.substr("i18n_".length);
                                    formModel.breakpointResetData[widgetId][propToUpdate] = setterFinalPath[propToUpdate] || "";
                                } else {
                                    formModel.breakpointResetData[widgetId][prop] = setterFinalPath[prop] !== undefined ? setterFinalPath[prop] : "";
                                }
                            }
                            if (wdata.parent) {
                                formModel.breakpointResetData[widgetId].parent = wdata.parent;
                            }
                            if (wdata.instanceId) {
                                formModel.breakpointResetData[widgetId].instanceId = wdata.instanceId;
                            }
                            if (wdata.isSrcCompTopFlex) {
                                formModel.breakpointResetData[widgetId].isSrcCompTopFlex = wdata.isSrcCompTopFlex;
                            }
                            if (wdata.parentWgtAccessPath) {
                                formModel.breakpointResetData[widgetId].parentWgtAccessPath = wdata.parentWgtAccessPath;
                            }
                        }
                        if (prop.indexOf("i18n_") >= 0) {
                            const propToUpdate = prop.substr("i18n_".length);
                            setterFinalPath[propToUpdate] = kony.i18n.getLocalizedString(wdata[prop]);
                        } else if (flexProps.indexOf(prop) > -1 && prop !== 'zIndex') {
                            //Unlike other flex properties, value of zIndex is a number and not an object
                            setterFinalPath[prop] = wdata[prop].value;
                        } else if (segmentProps.indexOf(prop) < 0) {
                            setterFinalPath[prop] = wdata[prop];
                        }
                    }
                    //For breakpoint specific template properties for segment, the order is important hence we are passing the properties in the array.
                    segmentProps.forEach(function(prop) {
                        if (prop === "data") {
                            setLocalizedSegmentData(setterFinalPath, wdata[prop]);
                        } else {
                            setterFinalPath[prop] = wdata[prop];
                        }
                    });
                    if (formModel.breakpointResetData && formModel.breakpointResetData[widgetId]) {
                        formModel.breakpointResetData[widgetId].segmentProps = segmentProps;
                    }
                }
            }
        }
        //Reset previous breakpoint values
        if (formModel.breakpointResetData) {
            var wdata = null;
            if (formModel.breakpointData[width]) {
                wdata = formModel.breakpointData[width];
            } else {
                wdata = {};
            }
            for (var wgtId in formModel.breakpointResetData) {
                var wgtData = wdata[wgtId] || {};
                var wgtResetData = formModel.breakpointResetData[wgtId];
                var setterBasePath = getSetterFinalPath(formModel.breakpointResetData, wgtId, formModel);
                var segmentProps = wgtResetData.segmentProps || [];
                for (var prop in wgtResetData) {
                    if ((['parent', 'instanceId', 'isSrcCompTopFlex', 'segmentProps'].indexOf(prop) >= 0) || wgtData[prop] !== undefined) {
                        continue;
                    }
                    if (wgtData['i18n_' + prop]) {
                        continue;
                    }
                    if (segmentProps.indexOf(prop) < 0) {
                        if (prop.indexOf("i18n_") >= 0) {
                            const propToUpdate = prop.substr("i18n_".length);
                            setterBasePath[propToUpdate] = kony.i18n.getLocalizedString(wdata[prop]);
                        } else if (flexProps.indexOf(prop) > -1) {
                            setterBasePath[prop] = wgtResetData[prop].value;
                        } else {
                            setterBasePath[prop] = wgtResetData[prop];
                        }
                        delete wgtResetData[prop];
                    }
                }
                segmentProps.forEach(function(prop) {
                    if (wgtData[prop] === undefined && wgtResetData[prop]) {
                        if (prop === "data") {
                            setLocalizedSegmentData(setterBasePath, wgtResetData[prop]);
                        } else {
                            setterBasePath[prop] = wgtResetData[prop];
                        }
                        delete wgtResetData[prop];
                    }
                });
            }
        }
    }
}
voltmx.visualizer.syncComponentInstanceDataCache = function(formModel) {
    if (formModel && formModel.compInstData) {
        var instData = formModel.compInstData;
        for (var widgetId in instData) {
            var setterFinalPath = getSetterFinalPath(instData, widgetId, formModel);
            if (setterFinalPath) {
                var wdata = instData[widgetId];
                for (var prop in wdata) {
                    if (['parent', 'segmentProps'].indexOf(prop) >= 0) continue;
                    wdata[prop] = setterFinalPath[prop];
                }
            }
        }
    }
}
voltmx.visualizer.toBoolean = function(output) {
    try {
        if (typeof output === "string") {
            if (output && output.toLowerCase() === "true") {
                output = true;
            } else {
                output = false;
            }
        } else if (typeof output === "number") {
            output = Boolean(output);
        }
    } catch (e) {
        voltmx.print('Error while converting the value to boolean datatype: ' + e);
    }
    return output;
};
voltmx.visualizer.toNumber = function(output) {
    try {
        if (typeof output !== "undefined") { //isMXGo undefined check added
            if (typeof output === "string") {
                if (!output || isNaN(Number(output))) {
                    voltmx.print('The value [' + output + '] after data type conversion is not a number(NaN)');
                } else {
                    output = Number(output);
                }
            } else if (typeof output === "boolean") {
                output = Number(output);
            }
        }
    } catch (e) {
        voltmx.print('Error while converting the value to number datatype: ' + e);
    }
    return output;
};
voltmx.visualizer.toString = function(output) {
    try {
        //Checks if there is no value on field
        if (typeof output !== "undefined") { //isMXGo undefined check added
            if (["number", "boolean"].indexOf(typeof output) !== -1) {
                output = (output).toString();
            }
        } else { //isMXGo else statement added to make null to blank value
            //Replaces "blank" value instead of undefined/null (to avoid error when passing null value on TextField widget)
            output = "";
        }
    } catch (e) {
        voltmx.print('Error while converting the value to string datatype: ' + e);
    }
    return output;
};
/** conversion to calendar date format (dd/mm/yyyy)
 *@param {String} output
 */
voltmx.visualizer.toCalendarDateFormat = function(output) {
    try {
        var date = new Date(output);
        output = date.toLocaleDateString('en-GB');
    } catch (e) {
        voltmx.print('Error while converting ' + output + ' to date(dd/mm/yyyy) format: ' + e);
    }
    return output;
};
/**conversion to server response date format
 *@param {String} output
 */
voltmx.visualizer.toISODateFormat = function(output) {
    try {
        //check if output is already in ISO dateformat and if yes, return it.
        if (output.split("-").length === 3 && new Date(output).toString() !== "Invalid Date") {
            return output;
        }
        var date = output.split("/");
        if (date.length === 3 && new Date(date[2], date[1] - 1, date[0]).toString() !== "Invalid Date") {
            output = new Date(date[2], date[1] - 1, date[0]).toISOString();
            return output;
        }
        throw "Invalid Date format";
    } catch (e) {
        voltmx.print('Error while converting ' + output + ' to ISO format string: ' + e);
    }
    return output;
};
voltmx.visualizer.toBooleanMXGO = function(t) {
    try {
        if (typeof t === "string") {
            if (t && t.toLowerCase() === "true") {
                t = true
            } else {
                t = false
            }
        } else if (typeof t === "number") {
            t = Boolean(t)
        }
    } catch (t) {
        voltmx.print("Error while converting the value to boolean datatype: " + t)
    }
    return !t
};
voltmx.visualizer.toDateComponentsFormat = function(e) {
    try {
        if (typeof e !== "undefined" && e !== "") {
            var t = new Date(e);
            if (Object.prototype.toString.call(t) === "[object Date]" && !isNaN(t.getTime())) {
                if (t.getTimezoneOffset() != 0) {
                    t.setDate(t.getDate() + 1)
                }
                e = t.toLocaleDateString("en-GB").split("/")
            } else {
                voltmx.print("Error while converting " + e + " to date(dd/mm/yyyy) format.");
                e = null
            }
        } else {
            e = null
        }
    } catch (t) {
        voltmx.print("Error while converting " + e + " to date(dd/mm/yyyy) format: " + t)
    }
    return e
};
voltmx.visualizer.toCalendarDateFormatUTCToLocalDate = function(e) {
    try {
        if (typeof e !== "undefined" && e !== "") {
            var t = new Date(e);
            if (Object.prototype.toString.call(t) === "[object Date]" && !isNaN(t.getTime())) {
                if (t.getTimezoneOffset() != 0) {
                    t.setDate(t.getDate() + 1)
                }
                e = t.toLocaleDateString("en-GB")
            } else {
                voltmx.print("Error while converting " + e + " to date(dd/mm/yyyy) format. Displaying the string value instead")
            }
        } else {
            e = null
        }
    } catch (t) {
        voltmx.print("Error while converting " + e + " to date(dd/mm/yyyy) format: " + t)
    }
    return e
};
voltmx.visualizer.ISODatetoDateFormat = function(e) {
    try {
        const t = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
        if (t.test(e)) {
            e = e.split("T");
            e = e[0]
        } else {
            return null
        }
    } catch (t) {
        voltmx.print("Error while converting " + e + " to basic date format: " + t)
    }
    return e
};
voltmx.visualizer.toBulletListIfArray = function(e) {
    try {
        if (typeof e !== "undefined") {
            const r = [];
            const t = JSON.parse(e);
            if (t && t.length === 1 && t[0] === "") {
                return ""
            }
            if (t && t.length) {
                t.forEach(function(t) {
                    r.push("<li style='margin-left: 13px'>" + t + "</li>")
                });
                if (r && r.length) {
                    r.unshift("<ul style='max-height: 150px;display: block;list-style: disc; columns: 1;'>");
                    r.push("</ul>");
                    e = r.join("")
                }
            }
        } else {
            e = ""
        }
    } catch (t) {
        voltmx.print("Error while converting " + e + " to multi-value format: " + t)
    }
    return e
};
voltmx.visualizer.toMultiValueFormat = function(r, t) {
    try {
        if (typeof r !== "undefined") {
            let e = JSON.parse(r);
            if (typeof t !== "undefined" && t.includes("date")) {
                for (i in e) {
                    try {
                        let t = new Date(e[i]);
                        e[i] = voltmx.visualizer.toCalendarDateFormatUTCToLocalDate(t)
                    } catch (t) {
                        console.log(t.message)
                    }
                }
            }
            r = e.join(", ")
        } else {
            r = ""
        }
    } catch (t) {
        voltmx.print("Error while converting " + r + " to multi-value (comma-separated) format: " + t)
    }
    r = voltmx.visualizer.toString(r);
    return r
};
voltmx.visualizer.toCheckBoxGroupFormat = function(t, e) {
    try {
        if (typeof t === "undefined" || t === null) {
            return []
        }
        if (!Array.isArray(e) || e.length === 0) {
            console.error("Invalid masterData: It is either undefined, null, or not an array.");
            return []
        }
        if (typeof t === "string" && t.trim().startsWith("[") && t.trim().endsWith("]")) {
            t = JSON.parse(t)
        }
        if (!Array.isArray(t)) {
            console.error("Invalid input format: Output is not a valid array.");
            return []
        }
        const r = e.map(t => t[0]);
        const n = t.filter(t => r.includes(t));
        return n
    } catch (t) {
        console.error("Error while parsing input to array:", t);
        return []
    }
};
voltmx.visualizer.toRadioButtonGroupFormat = function(t, e) {
    try {
        if (typeof t === "undefined" || t === null) {
            return null
        }
        if (!Array.isArray(e) || e.length === 0) {
            console.error("Invalid masterData: It is either undefined, null, or not an array.");
            return null
        }
        const r = e.map(t => t[0]);
        const n = r.includes(t);
        if (n) {
            return t
        }
        return null
    } catch (t) {
        console.error("Error while parsing toRadioButtonGroupFormat:", t);
        return []
    }
};
voltmx.visualizer.toRadioButtonGroupData = function(t, e) {
    try {
        if (typeof t === "undefined" || t === null || t === "") {
            console.error("Invalid output: It is either undefined, null, or an empty string.");
            return null
        }
        if (!Array.isArray(e) || e.length === 0) {
            console.error("Invalid masterData: It is either undefined, null, or not an array.");
            return null
        }
        const r = e.map(t => t[0]);
        const n = r.includes(t[0]);
        if (n) {
            return t[0]
        }
        return null
    } catch (t) {
        console.error("Error while parsing toRadioButtonGroupFormat:", t);
        return null
    }
};
voltmx.visualizer.isRadioButtonValid = function(t) {
    try {
        if (typeof t === "undefined" || t === null || t === "") {
            console.error("Invalid output: It is either undefined, null, or an empty string.");
            return ""
        }
        return t
    } catch (t) {
        console.error("Error while parsing isRadioButtonValid:", t);
        return ""
    }
};
voltmx.visualizer.toExtractKeysInCheckboxGroup = function(e) {
    try {
        if (typeof e === "undefined") {
            return []
        }
        if (typeof e === "string") {
            e = JSON.parse(e)
        }
        if (Array.isArray(e)) {
            return e.map(t => t[0])
        } else {
            return []
        }
    } catch (t) {
        voltmx.print("Error while converting " + e + " to array format: " + t);
        return []
    }
};
voltmx.visualizer.toDecodeFormat = async function(m, f, p, y) {
    try {
        if (typeof m === "undefined") {
            return ""
        }
        return await new Promise(async r => {
            try {
                let t;
                if (m.includes("<img")) {
                    return r(atob(m))
                } else {
                    t = new TextDecoder("utf-8").decode(new Uint8Array([...atob(m)].map(t => t.charCodeAt(0))))
                }
                const e = new DOMParser;
                const n = e.parseFromString(t, "text/html");
                const o = n.querySelectorAll("img");
                if (!o.length) {
                    return r(t)
                }
                n.querySelectorAll(".domino-attachment").forEach(t => {
                    let e = document.createElement("img");
                    e.loading = "lazy";
                    e.src = "/" + location.pathname.split("/")[1] + "/desktopweb/images/dataPanel/download.png";
                    e.style.cssText = "height:13px;width:16px;margin-right:5px;";
                    e.classList.add("mxgo-fileAttach-icon");
                    t.insertAdjacentElement("beforebegin", e)
                });
                const i = new kony.sdk.dto.DataObject(p);
                const a = (new voltmx.sdk.getCurrentInstance).getObjectService(f);
                i.addField("x_0040unid", y);
                for (let [t, e] of o.entries()) {
                    const l = t === o.length - 1;
                    const s = e.src;
                    if (e.src.includes("OpenElement&FieldElemFormat")) {
                        voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
                        const c = {
                            binaryAttrName: encodeURI(s.replace(location.origin, "")),
                            queryParams: {
                                unid: y,
                                name: encodeURI(s.replace(location.origin, "")),
                                type: "byte"
                            },
                            dataObject: i
                        };
                        try {
                            const u = await new Promise((e, o) => {
                                a.getBinaryContent(c, t => {
                                    e(t)
                                }, t => {
                                    let e = "";
                                    const r = "Failed to download attachment/s! ";
                                    if (typeof t.errmsg === "string" && t.errmsg.trim().startsWith("{") && t.errmsg.trim().endsWith("}")) {
                                        const n = JSON.parse(t.errmsg);
                                        e = `${r} ${n.message||n.errorMessage||n.errmsg}`
                                    } else if (typeof t.errmsg === "string") {
                                        e = `${r} ${t.errmsg}`
                                    } else {
                                        e = r
                                    }
                                    voltmx.application.dismissLoadingScreen();
                                    voltmx.ui.Alert({
                                        alertType: constants.ALERT_TYPE_ERROR,
                                        message: e
                                    }, {
                                        iconPosition: constants.ALERT_ICON_POSITION_LEFT
                                    });
                                    o(t)
                                })
                            });
                            e.src = `data:image/${c.queryParams.name.slice(c.queryParams.name.lastIndexOf("=")+1)};base64, ${u}`
                        } finally {
                            voltmx.application.dismissLoadingScreen()
                        }
                    } else if (e.src.includes("/icons/")) {
                        let t = location.pathname.replace("/kdw", "");
                        const d = t + "/desktopweb/images/icons/";
                        e.src = e.src.replace("/icons/", d)
                    }
                    if (l) {
                        r(n.documentElement.innerHTML)
                    }
                }
            } catch (t) {
                voltmx.print("Error while decoding the base64 encoded field value: " + t);
                r("")
            }
        })
    } catch (t) {
        voltmx.print("Error Invalid data conversion cannot be decoded " + m + " " + t)
    }
    return m
};
voltmx.visualizer.toEncodeFormat = function(n) {
    try {
        if (typeof n !== "undefined" && n.trim() !== "" && n !== "<p><br></p>") {
            const t = new DOMParser;
            const o = t.parseFromString(n, "text/html");
            const i = o.querySelectorAll("img");
            if (i.length) {
                o.querySelectorAll(".mxgo-fileAttach-icon").forEach(t => t.remove());
                i.forEach((e, t) => {
                    if (e.src.includes("/icons/")) {
                        let t = location.pathname.replace("/kdw", "");
                        const r = t + "/desktopweb/images/icons/";
                        e.src = e.src.replace(r, "/icons/")
                    }
                    if (t === i.length - 1) {
                        n = o.documentElement.innerHTML
                    }
                })
            }
            const e = new TextEncoder;
            const r = e.encode(n);
            const a = r.reduce((t, e) => t + String.fromCharCode(e), "");
            return btoa(a)
        } else {
            n = ""
        }
    } catch (t) {
        voltmx.print("Error Invalid data conversion cannot be encoded " + n + " " + t)
    }
    return n
};
/**
 * Util to return value of the widget property with the {propertyName}
 * @param {Object/String} output
 * @param {String} propertyName
 * @returns {Object/String} - Returns value of {propertyName} if present, else it returns {output} as it is.
 */
voltmx.visualizer.getPropertyValue = function(output, propertyName) {
    if (typeof output === "object") {
        if (output.hasOwnProperty(propertyName)) {
            return output[propertyName];
        } else {
            voltmx.print(JSON.stringify(output) + ' does not have ' + propertyName + ' property');
        }
    }
    return output;
};
/*
	This API is used to merge User controller and controller action of Form.
 */
voltmx.visualizer.mixinControllerActions = function(controller, controllerActions) {
    for (var i = 0; i < controllerActions.length; i++) {
        var actions = require(controllerActions[i]);
        for (var key in actions) {
            /*If the user has defined action in formController then that takes priority 
            	over the action generated in controllerActions.
            	Example: onNavigate
            */
            if (typeof controller[key] === "undefined") {
                controller[key] = actions[key];
            }
        }
    }
    return controller;
};
voltmx.visualizer.i18nKeyObject = {
    "text": "i18n_text",
    "placeholder": "i18n_placeholder",
    "tabName": "i18n_tabName",
    "leftSideText": "i18n_leftSideText",
    "rightSideText": "i18n_rightSideText"
};
voltmx.visualizer.getI18nAttrb = function(property) {
    return voltmx.visualizer.i18nKeyObject[property];
};
//To set the passthrough properties at constructor level
function extendConfig(config, controllerConfig, id) {
    var __extendOverrides__ = function(config, currentOverrides, isTopLevelSrc) {
        Object.keys(currentOverrides).forEach(function(property) {
            var FLEX_PROPS_SANS_ZINDEX = ["left", "right", "top", "bottom", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "centerX", "centerY"];
            /*If height is preferred,
                For autogrowmode supported widgets, set autogrowmode and delete height from config.
                For other widgets, delete height from config.
            */
            if (property === "autogrowMode" && isTopLevelSrc) {
                delete config["height"];
                config[property] = currentOverrides[property];
            } else if (FLEX_PROPS_SANS_ZINDEX.indexOf(property) !== -1 && isTopLevelSrc) {
                if (currentOverrides[property] == 'viz.val_cleared' || (property === "height" && currentOverrides.hasOwnProperty(property) && currentOverrides[property] == voltmx.flex.USE_PREFERRED_SIZE)) {
                    delete config[property];
                } else {
                    config[property] = currentOverrides[property];
                }
            } else if (config[voltmx.visualizer.getI18nAttrb(property)] && isTopLevelSrc) {
                delete config[voltmx.visualizer.getI18nAttrb(property)];
                config[property] = currentOverrides[property];
            } else {
                config[property] = currentOverrides[property];
            }
        });
    };
    var __parseComponentId__ = function(wgtOverrideId) {
        //sample wgtOverrideId: "comp2.comp1.btnId"
        var parentIdArr = wgtOverrideId.split('.');
        return {
            rootId: parentIdArr.splice(0, 1)[0],
            childId: parentIdArr.join(".")
        };
    };
    var widgetsOverrides = (controllerConfig && controllerConfig.overrides);
    for (var wgtOverrides in widgetsOverrides) {
        var currentOverrides = widgetsOverrides[wgtOverrides];
        var idObj = __parseComponentId__(wgtOverrides);
        var rootId = idObj.rootId;
        var childId = idObj.childId;
        if (rootId === id) {
            if (config.overrides && childId) {
                if (config.overrides[childId]) {
                    __extendOverrides__(config.overrides[childId], currentOverrides);
                } else {
                    config.overrides[childId] = currentOverrides;
                }
            } else {
                //isTopLevelSrc is to indicate that this is the root source widget (without any nesting)
                var isTopLevelSrc = true;
                __extendOverrides__(config, currentOverrides, isTopLevelSrc);
            }
        }
    }
    return config;
};
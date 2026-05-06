const adapterConstants=require("../constants/domino_adapter_constants");const utils=require("../utils/domino_adapter_utils");let ns={};ns.generateGetBinaryOnDetailSnippet=function(){return class t{getId(t){let e=[];e.push(t);e.push(utils.getKGBValue(adapterConstants.KGB_KEYS.GET_BINARY));return e.join(adapterConstants.SNIPPET_ACTION.JOIN)}constructor(){this.setDefault()}setDefault(){this.addSnippetAction={id:this.getId(adapterConstants.SNIPPET_ACTION.ADD_SNIPPET),codeSnippet:adapterConstants.SNIPPET_ACTION.EMPTY,type:adapterConstants.SNIPPET_ACTION.ADD_SNIPPET}}setAddSnippetCode(t,e,a,n){let r=`
                var attrName = self.view.${n}.text;
                // value is expected to be comma separated string as of 2.1 version
                var hasMultipleAttachments = attrName && attrName.split(",");
                var objSvc = voltmx.sdk.getCurrentInstance().getObjectService('${t}');
                var dataObject = new kony.sdk.dto.DataObject('${e}');
                    dataObject.addField("${adapterConstants.DOMINO_ATTRIBUTES.DOMINO_ADAPTER_UNID}", self.view.${a}.text);

                if (hasMultipleAttachments && hasMultipleAttachments.length > 1) {
                    /** removes unnecessary characters on the stringified array **/
                    for (var i in hasMultipleAttachments) {
                        if (hasMultipleAttachments[i]) {
                            var arrNames = hasMultipleAttachments[i].trim();
                            getBinaryContent(arrNames);
                        }
                    }
                } else {
                    getBinaryContent(attrName);
                }

                function getBinaryContent(attributeName) {
                    voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
                    var options = {
                        /** removes file extension on documents **/
                        binaryAttrName: attributeName.replace(/.[^/.]+$/, ""),
                        queryParams: {
                            unid: self.view.${a}.text,
                            name: attributeName
                        },
                        dataObject: dataObject
                    };

                    /** Formats the base64 data into binary data and then creates the file to be downloaded. **/
                    objSvc.getBinaryContent(options, (data) => {
                        var binaryData = atob(data);
                        var bytes = new Uint8Array(binaryData.length);
                        for (var i = 0; i < binaryData.length; i++) {
                            var ascii = binaryData.charCodeAt(i);
                            bytes[i] = ascii;
                        }
                        var blob = new Blob([bytes], {
                            type: "octet/stream"
                        });
                        var url = window.URL.createObjectURL(blob);
                        var link = document.createElement("a");
                        link.download = attributeName;
                        link.href = url;
                        link.click();
                        window.URL.revokeObjectURL(url);
                      	voltmx.application.dismissLoadingScreen();
                    }, errorCallback);
                }

                function errorCallback(data) {
                    let errMsg = '';
                    const defaultErrMessage = "Failed to download attachment/s! ";

                    try {
                        const errorObj = JSON.parse(data.errmsg);
                        errMsg = (errorObj.message === "undefined" || errorObj.message === null) ? defaultErrMessage : defaultErrMessage + errorObj.message;
                    } catch (e) {
                        errMsg = defaultErrMessage;
                    }

                	voltmx.application.dismissLoadingScreen();
                    voltmx.ui.Alert({
                        "alertType": constants.ALERT_TYPE_ERROR,
                        "message": errMsg,
                    }, {
                        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                    });
                }`;this.addSnippetAction.codeSnippet=r}toActions(){return[this.addSnippetAction]}}};module.exports=ns;
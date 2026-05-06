const designImportMigration=require("../../../../../design_import_migration");const i18next=designImportMigration.getMxgoUtils().utilFunctions.i18next;const beautify=designImportMigration.getMxgoUtils().actionEditorFunctions.beautify;const _kgb_=designImportMigration.getMxgoUtils().getKgbGlobal();class UpdateOnMappingActions{getId(e){let t=[];t.push(e);t.push(_kgb_.modules.utils.getKUID().toString());return t.join("_")}constructor(e={}){this.setDefault()}setDefault(){this.navigatedFromConfig={id:this.getId("IF_CONDITION"),type:"IF_CONDITION",parentId:null,callbackType:null,conditions:[{leftValue:"",leftValueType:"navigationsource",leftItemKUID:"",leftWidgetKUID:"",sequenceId:"",eventName:"",widgetId:""}]};this.showLoadingIndicator={id:this.getId("LOADING_INDICATOR"),selectedOption:"show",type:"LOADING_INDICATOR",parentId:this.navigatedFromConfig.id};this.serviceCall={id:this.getId("INVOKE_OBJECT_SERVICE"),mappings:{},mappingsOrder:[],serviceconfig:{servicename:"",type:"",objectname:"",serviceid:"",methodname:"get"},type:"INVOKE_OBJECT_SERVICE",parentId:this.navigatedFromConfig.id};this.dismissLoadingIndicator={callbackType:"Callback",id:this.getId("LOADING_INDICATOR"),selectedOption:"dismiss",parentId:this.serviceCall.id,type:"LOADING_INDICATOR"};this.successCondition={callbackType:"Callback",conditions:[{leftValue:"",leftValueType:"value",operator:"===",rightValue:"0",rightValueType:"value"}],id:this.getId("IF_CONDITION"),parentId:this.serviceCall.id,type:"IF_CONDITION"};this.addMappingConfig={id:this.getId("ADD_MAPPING"),type:"ADD_MAPPING",mappings:{},mappingsOrder:[],parentId:this.successCondition.id};this.failureCondition={callbackType:"Callback",id:this.getId("ELSE_CONDITION"),parentId:this.serviceCall.id,type:"ELSE_CONDITION"};this.failureAlert={alertMessage:i18next.t("Data Fetching failed! Please try again later."),alertType:"constants.ALERT_TYPE_INFO",id:this.getId("SHOW_ALERT"),parentId:this.failureCondition.id,type:"SHOW_ALERT"};this.addSnippetAction={id:this.getId("ADD_SNIPPET"),codeSnippet:"",type:"ADD_SNIPPET",parentId:this.successCondition.id}}setServiceConfig(e={}){this.serviceCall.serviceconfig.servicename=e.servicename;this.serviceCall.serviceconfig.type=e.type;this.serviceCall.serviceconfig.objectname=e.objectname;this.serviceCall.serviceconfig.serviceid=e.serviceid}setLeftValueOfSuccessCondition(e=""){this.successCondition.conditions[0].leftValue=e}setNavigatedFromConditionConfig(e={}){this.navigatedFromConfig.conditions[0].leftValue=e.leftValue;this.navigatedFromConfig.conditions[0].leftWidgetKUID=e.leftWidgetKUID;this.navigatedFromConfig.conditions[0].leftItemKUID=e.leftItemKUID;this.navigatedFromConfig.conditions[0].eventName=e.eventName;this.navigatedFromConfig.conditions[0].widgetId=e.widgetId;this.navigatedFromConfig.conditions[0].sequenceId=e.sequenceId}setMappingsForServiceCall(e=[]){let t={},i=[];e.forEach(function(e){t[e.id]=e;i.push(e.id)});this.serviceCall.mappings=t;this.serviceCall.mappingsOrder=i}setMappingsForAddMapping(e=[]){let t={},i=[];e.forEach(function(e){t[e.id]=e;i.push(e.id)});this.addMappingConfig.mappings=t;this.addMappingConfig.mappingsOrder=i}setAddSnippetCode(e,t,i,a,n){let s=`var filesContainer = document.querySelector("#filesContainer");
								var attrName =  ${e}["records"][0]["${i}"];
								var hasMultipleAttachments = attrName ? attrName.indexOf("[") : false;
								var objSvc = voltmx.sdk.getCurrentInstance().getObjectService('${t}');
								var dataObject = new kony.sdk.dto.DataObject('${e}');
								dataObject.addField("${a}", ${e}["records"][0]["${a}"]);
				
								var getSizeInByte = (data) => {
										var length = data.length;
										var fileSizeInByte = Math.ceil(parseFloat(length) / 4) * 3;
										if (fileSizeInByte >= 2) {
												var paddings = data.slice(-2);
												fileSizeInByte = paddings === "==" ? fileSizeInByte - 2 : paddings.includes('=') ? fileSizeInByte - 1 : fileSizeInByte;
										}
					return fileSizeInByte;
								};

								const errorCallback = (data) => {
										voltmx.application.dismissLoadingScreen();
										voltmx.ui.Alert({
												"alertType": constants.ALERT_TYPE_ERROR,
												"message": "Failed to get attachments!",
										}, {
												"iconPosition": constants.ALERT_ICON_POSITION_LEFT
										});
								};

								const getFieldNameForAttachment = (fileName) => {
					var fieldName = "";
									var richtextFields = Object.keys(self.view).filter(field => field.includes("instance"));
										if (richtextFields && richtextFields.length != 0) {
											richtextFields.forEach((field) => {
													try {
														if (self.view[field] && self.view[field].checkOrRemoveFile(fileName)) {
															fieldName = field.replace('instance', ''); 
														}
													} catch(e) {
														console.log(e);
													}
													
												});
										}
										return fieldName;
								};
								const getBinaryContent = (attributeName, cb) => {
										var fileId = btoa(attributeName);
										var propertyName = getFieldNameForAttachment(attributeName);
										var options = {
												binaryAttrName: attributeName.replace(/.[^/.]+$/, ""),
												queryParams: {
														unid: self.view.${n}.text,
														name: attributeName
												},
												dataObject: dataObject
										};
										objSvc.getBinaryContent(options, (data) => {
												if (data) {
														oldFiles.push({
																id: fileId,
																fileBase64: data,
																fileName: attributeName,
																fieldName: propertyName
														});
														files.push({
																id: fileId,
																fileBase64: data,
																fileName: attributeName,
																fieldName: propertyName
														});
							let fileSize = formatFileSize(getSizeInByte(data));
							createRowFile(filesContainer, fileId, attributeName, fileSize, propertyName);
														cb();
												}
										}, errorCallback);
								};
				
								let result = new Promise((resolve) => {
									voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
									files = [];
									oldFiles = [];
									filesContainer.innerHTML = "";
									if (attrName) {
										if (hasMultipleAttachments != -1) {
											attrName = attrName.replace(\/[\"\\]\\[\\\\]\/g, "");  
											var count = 0;
											var arrNames = attrName.split(",");
											for (var i in arrNames) {
												getBinaryContent(arrNames[i], () => {
													count++;
													if (count === arrNames.length) {
														resolve();
													}
												});
											}
										} else if (hasMultipleAttachments) {
											getBinaryContent(attrName, () => {
												resolve();
											});
										}
									} else {
										resolve();
									}
								});
				
								result.then(() => {
									voltmx.application.dismissLoadingScreen();
								});`;this.addSnippetAction.codeSnippet=beautify(s,{preserve_newlines:false})}toActions(){return[this.navigatedFromConfig,this.showLoadingIndicator,this.serviceCall,this.dismissLoadingIndicator,this.successCondition,this.addMappingConfig,this.addSnippetAction,this.failureCondition,this.failureAlert]}}module.exports={UpdateOnMappingActions:UpdateOnMappingActions};
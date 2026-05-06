const designImportMigration=require("../../../../../design_import_migration");const foundryConstants=require("../../../foundry/constants");const _kgb_=designImportMigration.getMxgoUtils().utilFunctions._kgb_;class DeleteSnippet{getId(e){let t=[];t.push(e);t.push(_kgb_.modules.utils.getKUID().toString());return t.join("_")}constructor(){this.setDefault()}setDefault(){this.addSnippetAction={id:this.getId("ADD_SNIPPET"),codeSnippet:"alert('test')",type:"ADD_SNIPPET"}}setAddSnippetCode(e,t,n,r){var o=`
		var objService = '${e}';
		var intServScope = objService ? objService.split("_") : [];

		var unidlbl = self.view.${n}.text;
		var formlbl = self.view.${r}.text;
		var formDataObject;

		// Object name must contain only alpha-numeric characters or '_', must begin with a letter and must be between 1 and 50 characters long.
		function formatObjectModelName(objectname) {

			if (!objectname.length) {
				return false;
			}
			// replace all spaces
			objectname = objectname.replace(/ /g, '');

			function firstLetter(str) {
				var latestStr = str;
				while (!/^[A-Za-z]*$/.test(latestStr[0])) {
					latestStr = latestStr.substring(1);
				}
				return latestStr;
			}

			function removeSpecialChar(str) {
				var charCodeArr = [];
				for (let i of str) {
					if (i && /^[A-Za-z0-9_]*$/.test(i)) {
						charCodeArr.push(i);
					} else {
						charCodeArr.push('_');
					}

				}
				return charCodeArr.join('');
			}
			var checkLetter = firstLetter(objectname);
			var rmSpecialchar = removeSpecialChar(checkLetter);

			if (rmSpecialchar.length >= 50) {
				return rmSpecialchar.substring(0, 50)
			} else {
				return rmSpecialchar;
			}
		}

		if ((intServScope && intServScope.length != 2) || !formlbl || !unidlbl) {
			voltmx.ui.Alert(
			{
				alertType: constants.ALERT_TYPE_ERROR,
				message: "Missing parameters: object name, form name or unid"
			},
			{
				iconPosition: constants.ALERT_ICON_POSITION_LEFT
			}
			);
			return;
		}

		voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
		var integrationSvc;	

		try {
			integrationSvc = voltmx.sdk.getCurrentInstance().getIntegrationService(intServScope[0]);
		} catch(e) {
			voltmx.application.dismissLoadingScreen();
							console.log(e);
			voltmx.ui.Alert(
							{
								alertType: constants.ALERT_TYPE_ERROR,
								message: e.message
							},
							{
								iconPosition: constants.ALERT_ICON_POSITION_LEFT
							}
						);
			return;
		}

		var params = {
			DESIGNNAME: self.view.${r}.text,
			SCOPE: intServScope[1]
		};

		integrationSvc.invokeOperation(
			'${foundryConstants.INT_SERVICE_KEEPAPI_OP.GET_DESIGN_FORM_BY_NAME}',
			{},
			params,
			function (response) {
				voltmx.application.dismissLoadingScreen();
				if (response && response.httpStatusCode === 200) {
					try {
						if (response && response['@name']) {
							formDataObject = formatObjectModelName(response['@name']);
							processDeletion();
						} else {
							voltmx.application.dismissLoadingScreen();
							voltmx.ui.Alert(
								{
									alertType: constants.ALERT_TYPE_ERROR,
									message: "Missing response @name from get design api"
								},
								{
									iconPosition: constants.ALERT_ICON_POSITION_LEFT
								}
							);
						}
					} catch(e) {
						console.log(e);
						alert(e);
					}
				} else {
					console.log(response);
					alert(JSON.stringify(response));
				}
			},
			function (error) {
				voltmx.application.dismissLoadingScreen();
				voltmx.ui.Alert(
					{
						alertType: constants.ALERT_TYPE_ERROR,
						message: "Failed to extract form name: "  + error.errmsg
					},
					{
						iconPosition: constants.ALERT_ICON_POSITION_LEFT
					}
				);
			}
		);

		function deletAlertHandlerTrue() {
			voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
			var objSvc = voltmx.sdk.getCurrentInstance().getObjectService('${e}');

			if (!formDataObject) {
				voltmx.application.dismissLoadingScreen();
				voltmx.ui.Alert({
						"alertType": constants.ALERT_TYPE_ERROR,
						"message": "Missing object service: " + formDataObject,
				}, {
						"iconPosition": constants.ALERT_ICON_POSITION_LEFT
				});
			}

			var dataObject = new kony.sdk.dto.DataObject(formDataObject);

			dataObject.addField("${foundryConstants.DOMINO_ADAPTER_UNID}", self.view.${n}.text);
			var options = {
				"dataObject": dataObject
			};

			objSvc.deleteRecord(options, (res) =>  {
				voltmx.application.dismissLoadingScreen();
				voltmx.print("Record deleted!");
					voltmx.ui.Alert({
						"alertType": constants.ALERT_TYPE_INFO,
						"message": "Record deleted!",
				}, {
						"iconPosition": constants.ALERT_ICON_POSITION_LEFT
				});
				
				var ntf = new voltmx.mvc.Navigation("${t}");
						ntf.navigate();
			}, (err) => {
				voltmx.print("Error in record delete!" + err.errmsg);
				voltmx.application.dismissLoadingScreen();
				voltmx.ui.Alert({
						"alertType": constants.ALERT_TYPE_ERROR,
						"message": "Error in record delete! " + err.errmsg,
				}, {
						"iconPosition": constants.ALERT_ICON_POSITION_LEFT
				});
			});
		}

		function deletAlertHandler(callback) {
			if (callback) {
				deletAlertHandlerTrue();
			}
		}

		function processDeletion() {
			voltmx.ui.Alert({
				"alertType": constants.ALERT_TYPE_CONFIRMATION,
				"message": "Are you sure you want to delete item?",
				"yesLabel": "Yes",
				"noLabel": "No",
				"alertHandler": deletAlertHandler
			}, {
				"iconPosition": constants.ALERT_ICON_POSITION_LEFT
			});
		}

		`;this.addSnippetAction.codeSnippet=o}toActions(){return[this.addSnippetAction]}}module.exports={DeleteSnippet:DeleteSnippet};